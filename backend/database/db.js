const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to the database file
const db = new sqlite3.Database(path.join(__dirname, 'drinkOrder.db'), (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS drinks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT NOT NULL,
      items TEXT NOT NULL, -- JSON string for order details
      totalPrice REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      customerNote TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
