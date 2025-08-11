const express = require('express');
const cors = require('cors');

const adminRoutes = require('./modules/admin/admin.routes');
const userRoutes = require('./modules/users/user.routes');
const productRoutes = require('./modules/products/product.routes');
const error = require('./middleware/error');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:4028', credentials: true }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use(error);

module.exports = app;
