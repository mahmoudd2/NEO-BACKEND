const express = require('express');
const cors = require('cors');


// const authRoutes = require('./modules/auth/routes');
const adminRoutes = require('./modules/admin/routes');
const alertRoutes = require('./modules/alert/routes');
const bundleRoutes = require('./modules/bundle/routes');
const bundleFearureRoutes = require('./modules/bundleFeature/routes');
const categoryRoutes = require('./modules/category/routes');
const companyRoutes = require('./modules/company/routes');
const featureRoutes = require('./modules/feature/routes');
const logRoutes = require('./modules/log/routes');
const paymentRoutes = require('./modules/payment/routes');
const permissionRoutes = require('./modules/permission/routes');
const productRoutes = require('./modules/product/routes');
const reportRoutes = require('./modules/report/routes'); 
const roleRoutes = require('./modules/role/routes');
const rolePermissionRoutes = require('./modules/rolePermission/routes');
const salesTransactionRoutes = require('./modules/salesTransaction/routes');
const stockRoutes = require('./modules/stock/routes');
const subscriptionRoutes = require('./modules/subscription/routes');
const userRoutes = require('./modules/users/routes');
const vendorRoutes = require('./modules/vendor/routes');
const warehouseRoutes = require('./modules/warehouse/routes');
const error = require('./middleware/error');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:4028', credentials: true }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/api/admin', adminRoutes);
app.use('/api/alert', alertRoutes);
app.use('/api/bundle', bundleRoutes);
app.use('/api/bundle-feature', bundleFearureRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/feature', featureRoutes);
app.use('/api/log', logRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/permission', permissionRoutes);
app.use('/api/product', productRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/role-permission', rolePermissionRoutes);
app.use('/api/sales-transaction', salesTransactionRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/warehouse', warehouseRoutes);
app.use(error);
module.exports = app;
