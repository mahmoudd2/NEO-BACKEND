const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');

// Auth
router.post('/login', c.login);

// Protected dashboard
router.get('/dashboard', verifyAdmin, c.getDashboard);

module.exports = router;
