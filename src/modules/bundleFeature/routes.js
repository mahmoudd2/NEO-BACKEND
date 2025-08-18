const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');


router.post('/', verifyAdmin, c.addBundleFeature);
router.put('/', verifyAdmin, c.editBundleFeature);
router.delete('/:id', verifyAdmin, c.deleteBundleFeature);



module.exports = router;