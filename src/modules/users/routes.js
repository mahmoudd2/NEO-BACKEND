const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../../middleware/auth');

// Create / Read
router.post('/', verifyAdmin, c.createUser);
router.get('/', verifyAdmin, c.getAllUsers);
router.get('/company/:companyId', verifyAdmin, c.getUsersByCompany);
router.get('/:id', verifyAdmin, c.getUserById);

// UPDATE + RESET PASSWORD + DELETE
router.put('/:id', verifyAdmin, c.updateUser);
router.post('/:id/reset-password', verifyAdmin, c.resetPassword);
router.delete('/:id', verifyAdmin, c.deleteUser);

router.post('/me/change-password', c.changeMyPassword);

router.post('/login', c.login);

module.exports = router;
