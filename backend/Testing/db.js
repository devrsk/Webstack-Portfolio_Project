const { Pool } = require('pg');

// Database
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'propertypro',
  port: 5432, // Replace with the appropriate port
});

pool.connect((err) => {
  if (err) {
    console.error('DB connection error');
    throw err;
  } else {
    console.log('Successfully connected to the database');
  }
});

module.exports = pool;
