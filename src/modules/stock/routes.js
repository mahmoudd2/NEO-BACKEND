const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../middleware/auth')


router.post('/', verifyAdmin, c.addStock);
router.put('/', verifyAdmin, c.editStock);

router.delete('/', verifyAdmin, c.deleteStock);
router.get('/', verifyAdmin, c.getAllStocks);

module.exports = router;
