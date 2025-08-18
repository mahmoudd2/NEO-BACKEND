const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../../middleware/auth')

router.post('/', verifyAdmin, c.createRole);
router.get('/', verifyAdmin, c.getAllRoles);
router.get('/getRoleById/:id', verifyAdmin, c.getRoleById);
router.put('/:id', verifyAdmin, c.updateRole);
router.delete('//:id', verifyAdmin, c.deleteRole);


module.exports = router;
