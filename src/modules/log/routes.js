const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');

router.post('/', verifyAdmin, c.addLog);
router.put('/', verifyAdmin, c.editLog);
router.delete('/:id', verifyAdmin, c.deleteLog);


module.exports = router;