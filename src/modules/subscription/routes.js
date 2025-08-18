const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../middleware/auth');

router.post('/', verifyAdmin, c.addSubscription);
router.put('/', verifyAdmin, c.editSubscription);
//by id in param
router.delete('/', verifyAdmin, c.deleteSubscription);


module.exports = router;
