const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../../middleware/auth')


router.post('/', verifyAdmin, c.linkPermissionsToRole);
router.get('/getPermissionsByRoleId/:id', verifyAdmin, c.getPermissionsByRoleId);
router.delete('/:id', verifyAdmin, c.deletePermissionsByRoleId);


module.exports = router;
