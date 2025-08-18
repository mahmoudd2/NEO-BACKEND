const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../middleware/auth')


router.post('/', verifyAdmin, c.addReport)

router.put('/', verifyAdmin, c.editReport)

//by id in params
router.delete('/', verifyAdmin, c.deleteReport)

router.get('/', verifyAdmin, c.getAllReports);


module.exports = router;
