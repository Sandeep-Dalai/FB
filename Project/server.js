const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'users',
  port: 3306
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Registration Endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const sql = `INSERT INTO user (username, password) VALUES ('${username}', '${password}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('User registered successfully');
    res.send('User registered successfully');
  });
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM user WHERE username='${username}' AND password='${password}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      console.log('Login successful');
      res.send('Login successful');
    } else {
      console.log('Invalid username or password');
      res.status(401).send('Invalid username or password');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
