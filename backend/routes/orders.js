const express = require('express');
const { getOrders, createOrder, updateOrderStatus } = require('../controllers/ordersController');

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:orderId', updateOrderStatus);

module.exports = router;
