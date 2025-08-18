const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../../middleware/auth');

router.post('/addProduct', verifyAdmin, c.addProduct);

router.delete('/deleteProduct/:id', verifyAdmin, c.deleteProduct);

router.put('/updateProduct/:id', verifyAdmin, c.updateProduct);

router.get('/getAllProducts', verifyAdmin, c.getAllProducts);

module.exports = router;
