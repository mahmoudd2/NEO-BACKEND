const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../middleware/auth')


router.post('/', verifyAdmin, c.linkPermissionsToRole);
router.get('/getPermissionsByRoleId/:id', verifyAdmin, c.getPermissionsByRoleId);
router.delete('//:id', verfyAdmin, adminDashController.c);


module.exports = router;
