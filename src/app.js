const express = require('express');
const cors = require('cors');


const authRoutes = require('./modules/auth/routes');
const adminRoutes = require('./modules/admin/routes');
const productRoutes = require('./modules/products/routes');
const userRoutes = require('./modules/users/routes');
const error = require('./middleware/error');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:4028', credentials: true }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(error);
module.exports = app;
