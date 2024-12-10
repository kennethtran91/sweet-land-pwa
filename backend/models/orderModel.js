const db = require('../database/db');

const Order = {
  getAll: (callback) => {
    db.all('SELECT * FROM orders ORDER BY createdAt DESC', [], callback);
  },
  create: (data, callback) => {
    db.run(
      'INSERT INTO orders (customerName, items, totalPrice, status, customerNote) VALUES (?, ?, ?, ?, ?)',
      [data.customerName, JSON.stringify(data.items), data.totalPrice, data.status, data.customerNote],
      callback
    );
  },
  updateStatus(orderId, status, callback) {
    const sql = 'UPDATE orders SET status = ? WHERE id = ?';
    db.run(sql, [status, orderId], callback);
  },
  delete: (id, callback) => {
    db.run('DELETE FROM orders WHERE id = ?', [id], callback);
  },
};

module.exports = Order;
