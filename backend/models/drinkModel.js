const db = require('../database/db');

const Drink = {
  getAll: (callback) => {
    db.all('SELECT * FROM drinks', [], callback);
  },
  create: (data, callback) => {
    db.run('INSERT INTO drinks (name, price, description, image) VALUES (?, ?, ?, ?)', [data.name, data.price, data.description, data.image], callback);
  },
  update: (id, data, callback) => {
    db.run('UPDATE drinks SET name = ?, price = ? WHERE id = ?', [data.name, data.price, id], callback);
  },
  delete: (id, callback) => {
    db.run('DELETE FROM drinks WHERE id = ?', [id], callback);
  },
};

module.exports = Drink;
