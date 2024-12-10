const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const drinkRoutes = require('./routes/drinks');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/drinks', drinkRoutes);
app.use('/api/orders', orderRoutes);

app.use(cors({ origin: 'http://localhost:4200' })); // Allow requests from the Angular app
// Start Server

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
