const Drink = require('../models/drinkModel');

const getDrinks = (req, res) => {
  Drink.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};

const createDrink = (req, res) => {
  Drink.create(req.body, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ message: 'Drink added' });
  });
};

const updateDrink = (req, res) => {
  const { id } = req.params;
  Drink.update(id, req.body, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(200).json({ message: 'Drink updated' });
  });
};

const deleteDrink = (req, res) => {
  const { id } = req.params;
  Drink.delete(id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(200).json({ message: 'Drink deleted successfully' });
  });
};

module.exports = { getDrinks, createDrink, updateDrink, deleteDrink };
