import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
});

// Define HallOfFame model
const HallOfFame = sequelize.define(
  "HallOfFame",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateEntry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true, // Set to false if required
    },
  },
  {
    // Other model options can be added here
  }
);

// Add some data to the model
HallOfFame.sync({ force: false }).then(() => {
  HallOfFame.create({
    username: "John Doe",
    points: 100,
    dateEntry: new Date(),
    avatar: "https://example.com/avatar.jpg",
  });
  HallOfFame.create({
    username: "Jane Doe",
    points: 200,
    dateEntry: new Date(),
    avatar: "https://example.com/avatar.jpg",
  });
});

// Export sequelize instance and models
export default {
  sequelize,
  models: {
    HallOfFame,
  },
};

// // Optionally, you can sync your models with the database
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync({ force: false }); // Use { force: true } to drop and recreate tables
//     console.log("Database synchronized successfully.");
//   } catch (error) {
//     console.error("Error synchronizing the database:", error);
//   }
// };

// syncDatabase(); // Call the function to sync the database
