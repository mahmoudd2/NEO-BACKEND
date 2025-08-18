const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');


router.post('/', verifyAdmin, c.addBundle);
router.put('/', verifyAdmin, c.editBundle);
router.delete('/:id', verifyAdmin, c.deleteBundleById);
router.get('/', verifyAdmin, c.getAllBundles);



module.exports = router;