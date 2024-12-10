const express = require('express');
const { getOrders, createOrder, updateOrderStatus, deleteOrder } = require('../controllers/ordersController');

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:orderId', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
