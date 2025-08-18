const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');


router.post('/', verifyAdmin, c.createCategory);

router.delete('/:id', verifyAdmin, c.deleteCategory);

router.put('/', verifyAdmin, c.editCategory);

router.get('/', verifyAdmin, c.getAllCategories);


module.exports = router;