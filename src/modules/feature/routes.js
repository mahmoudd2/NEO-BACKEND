const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');

router.post('/', verifyAdmin, c.addFeature);
router.put('/', verifyAdmin, c.editFeature);
router.delete('/:id', verifyAdmin, c.deleteFeatureById);


module.exports = router;