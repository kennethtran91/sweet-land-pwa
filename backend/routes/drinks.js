const express = require('express');
const { getDrinks, createDrink, updateDrink, deleteDrink } = require('../controllers/drinksController');

const router = express.Router();

router.get('/', getDrinks);
router.post('/', createDrink);
router.put('/:id', updateDrink);
router.delete('/:id', deleteDrink);

module.exports = router;
