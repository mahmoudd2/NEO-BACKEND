const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');

router.post('/', verifyAdmin, c.addPayment);
router.put('/', verifyAdmin, c.editPayment);
router.delete('/:id', verifyAdmin, c.deletePayment);


module.exports = router;