require("dotenv").config(); // Load environment variables
const { Sequelize } = require("sequelize");

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Matikan logging agar tidak terlalu banyak output
  }
);

module.exports = database;
