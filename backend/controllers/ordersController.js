const Order = require('../models/orderModel');

const getOrders = (req, res) => {
  Order.getAll((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};

const createOrder = (req, res) => {
  Order.create(req.body, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ message: 'Order added' });
  });
};

const updateOrderStatus = (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!orderId || !status) {
    return res.status(400).json({ message: 'Order ID and status are required' });
  }

  Order.updateStatus(orderId, status, (err) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'Order status updated successfully' });
  });
};

module.exports = { getOrders, createOrder, updateOrderStatus };
