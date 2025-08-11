const express = require('express');
const cors = require('cors');

const adminDashRoutes = require('../components/AdminDashboard/adminDashRoutes');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:4028', credentials: true }));
app.use(express.json());

// Health check
app.get('/health', (_, res) => res.json({ ok: true }));

// Routes
app.use('/api/adminDashboard', adminDashRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;
