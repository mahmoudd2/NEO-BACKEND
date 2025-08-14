const path = require('path');
// dist/config/knex.js -> ../.env
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const knex = require('knex');

module.exports = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD || ''),
    database: process.env.DB_NAME
  },
  pool: { min: 2, max: 10 }
});
