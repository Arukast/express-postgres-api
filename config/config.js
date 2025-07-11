require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST || 'localhost',
    "dialect": process.env.DB_DIALECT || 'postgres'
  },
  "test": {
    "username": process.env.DB_USER || 'postgres',
    "password": process.env.DB_PASS || 'qweqwe',
    "database": process.env.DB_NAME || 'express-postgres-api',
    "host": process.env.DB_HOST || 'localhost',
    "dialect": process.env.DB_DIALECT || 'postgres'
  },
  "production": {
    "username": process.env.DB_USER || 'postgres',
    "password": process.env.DB_PASS || 'qweqwe',
    "database": process.env.DB_NAME || 'express-postgres-api',
    "host": process.env.DB_HOST || 'localhost',
    "dialect": process.env.DB_DIALECT || 'postgres'
  }
}
