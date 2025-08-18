const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const controller = require('./controller');

router.post('/login', controller.login);

module.exports = router;
