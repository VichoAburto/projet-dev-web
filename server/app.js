import express from 'express';
import cookieParser from 'cookie-parser';
import db from './db.js';

const app = express();
const hostname = '127.0.0.1';
const port = 4000;

// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json());

let donnée = {
    valeur: 42
};

// Set or update cookies for player data
app.post('/set-players', (req, res) => {
    const { player1, avatar1, player2, avatar2 } = req.body;

    // Set cookies
    res.cookie('player1', player1, { httpOnly: true, maxAge: 86400000 });
    res.cookie('avatar1', avatar1, { httpOnly: true, maxAge: 86400000 });
    res.cookie('player2', player2, { httpOnly: true, maxAge: 86400000 });
    res.cookie('avatar2', avatar2, { httpOnly: true, maxAge: 86400000 });

    res.send('Player cookies have been set!');
});

// Retrieve player cookies
app.get('/get-players', (req, res) => {
    const { player1, avatar1, player2, avatar2 } = req.cookies;
    res.json({ player1, avatar1, player2, avatar2 });
});

// Clear player cookies
app.get('/clear-players', (req, res) => {
    res.clearCookie('player1');
    res.clearCookie('avatar1');
    res.clearCookie('player2');
    res.clearCookie('avatar2');
    res.send('Player cookies have been cleared!');
});

app.get('/', (req, res) => {
    res.json(donnée);
});

app.post('/', (req, res) => {
    donnée.valeur = req.body.valeur;
    console.log(donnée.valeur);
    res.redirect('/');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

console.log(`Server running at http://${hostname}:${port}/`);

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

const { HallOfFame } = db.models;

app.get('/hall-of-fame', (req, res) => {
    HallOfFame.findAll()
        .then((hallOfFame) => {
            hallOfFame.sort((a, b) => b.points - a.points);
            res.json(hallOfFame);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while fetching the Hall of Fame.');
        });
});

app.post('/hall-of-fame', (req, res) => {
    const { username, points, avatar } = req.body;
    const dateEntry = new Date();

    HallOfFame.create({ username, points, dateEntry, avatar })
        .then((hallOfFame) => {
            res.json(hallOfFame);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while creating the Hall of Fame entry.');
        });
});
