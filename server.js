// server.js
require('dotenv').config();
const express = require('express');
const app = express();

// ✅ Import middlewares and routes
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

// ✅ Middleware setup
app.use(express.json());
app.use(logger);

// ✅ Routes
app.use('/api/products', productRoutes);

// ✅ Healthcheck
app.get('/', (req, res) => {
  res.json({ message: 'Products API running' });
});

// ✅ Error handler (must be last)
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
