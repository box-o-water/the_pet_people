const mongoose = require('mongoose');
require('dotenv').config();

let mongoose;

if (process.env.JAWSDB_URL) {
  mongoose = new mongoose(process.env.JAWSDB_URL);
} else {
  mongoose = new mongoose(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = mongoose;