const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../middleware/auth')

router.post('/', verifyAdmin, c.addSalesTransaction);
router.put('/', verifyAdmin, c.editSalesTransaction);

//by id in param
router.delete('/', verifyAdmin, c.deleteSalesTransaction);


module.exports = router;
