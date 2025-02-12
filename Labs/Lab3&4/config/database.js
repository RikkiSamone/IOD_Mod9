const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Your database username
  password: 'password', // Your database password
  database: 'database_name', // Your database name
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error('error connecting to the database:', err.stack);
    return;
  }
  console.log('connected to the database');
});

module.exports = connection;