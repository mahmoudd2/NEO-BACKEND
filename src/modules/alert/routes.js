const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');


router.post('/', verifyAdmin, c.addAlert);
router.get('/', verifyAdmin, c.getAllAlerts);
router.delete('/:id', verifyAdmin, c.deleteAlert);




module.exports = router;
