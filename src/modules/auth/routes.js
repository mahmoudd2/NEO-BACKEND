const router = require('express').Router();
const controller = require('./controller');

router.post('/login', controller.login);

module.exports = router;
