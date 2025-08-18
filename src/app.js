const express = require('express');
const cors = require('cors');


// const authRoutes = require('./modules/auth/routes');
const adminRoutes = require('./modules/admin/routes');
// const productRoutes = require('./modules/product/routes');
const userRoutes = require('./modules/users/routes');
const alertRoutes = require('./modules/alert/routes');
const bundleRoutes = require('./modules/bundle/routes');
const bundleFeatureRoutes = require('./modules/bundleFeature/routes');
const categoryRoutes = require('./modules/category/routes');
const companyRoutes = require('./modules/company/routes');
const featureRoutes = require('./modules/feature/routes');
const logRoutes = require('./modules/log/routes');
const paymentRoutes = require('./modules/payment/routes');
const permissionRoutes = require('./modules/permission/routes');
const error = require('./middleware/error');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:4028', credentials: true }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

// app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/alert', alertRoutes);
app.use('/api/bundle', bundleRoutes);
app.use('/api/bundleFeature', bundleFeatureRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/feature', featureRoutes);
app.use('/api/log', logRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/permission', permissionRoutes);
app.use(error);
module.exports = app;
