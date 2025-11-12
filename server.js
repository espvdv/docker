const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = process.env.APP_PORT || 3000;

// Environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: 'mydb'
};

app.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    await connection.end();
    
    res.send(`
      <h1>Hello from Docker!</h1>
      <p>Node.js app is running in Docker container</p>
      <p>Database connection test: 1 + 1 = ${rows[0].solution}</p>
      <p>Environment: ${process.env.APP_ENV}</p>
    `);
  } catch (error) {
    res.send(`
      <h1>Hello from Docker!</h1>
      <p>Node.js app is running, but database error: ${error.message}</p>
    `);
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
