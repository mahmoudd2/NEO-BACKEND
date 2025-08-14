// knexfile.js
const path = require('path'); // ✅ import path first
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') }); // load root .env

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD || ''),
      database: process.env.DB_NAME
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'db', 'seeds')
    },
    pool: { min: 2, max: 10 }
  }
};
