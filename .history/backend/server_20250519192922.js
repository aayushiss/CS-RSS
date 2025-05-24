// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow all origins (for now)
app.options('*', cors()); // Handle preflight requests
  app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RSS',
  password: 'a13022004A',
  port: 5432, // default port
});

// Test DB connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
  release();
});

// POST route
app.post('/submit-form', async (req, res) => {
  const { name, email, query } = req.body;

  if (!name || !email || !query) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const insertQuery = `
      INSERT INTO queries (name, email, query)
      VALUES ($1, $2, $3)
    `;
    await pool.query(insertQuery, [name, email, query]);
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (err) {
    console.error('Error saving to PostgreSQL:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
