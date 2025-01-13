import { serialize } from 'cookie';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { player1, avatar1, player2, avatar2 } = req.body;

        // Check if all required fields are present
        if (!player1 || !avatar1 || !player2 || !avatar2) {
            return res.status(400).json({ message: 'Missing fields in request body.' });
        }

        // Set cookies
        res.setHeader('Set-Cookie', [
            serialize('player1', player1, { path: '/', maxAge: 86400, httpOnly: true }),
            serialize('avatar1', avatar1, { path: '/', maxAge: 86400, httpOnly: true }),
            serialize('player2', player2, { path: '/', maxAge: 86400, httpOnly: true }),
            serialize('avatar2', avatar2, { path: '/', maxAge: 86400, httpOnly: true }),
        ]);

        return res.status(200).json({ message: 'Cookies set!' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
