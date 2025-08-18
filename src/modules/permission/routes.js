const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');

router.post('/', verifyAdmin, c.createPermission);
router.get('/', verifyAdmin, c.getAllPermissions);
router.get('/:id', verifyAdmin, c.getPermissionById);
router.put('/:id', verifyAdmin, c.updatePermission);
router.delete('/:id', verifyAdmin, c.deletePermission);


module.exports = router;