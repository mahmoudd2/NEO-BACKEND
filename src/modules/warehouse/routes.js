const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../../middleware/auth');


router.post('/', verifyAdmin, c.createWarehouse);

router.get('/', verifyAdmin, c.getAllWarehouses);
router.get('/getWarehouseById/:id', verifyAdmin, c.getWarehouseById);
router.put('/updateWarehouse/:id', verifyAdmin, c.updateWarehouse);
router.delete('/deleteWarehouse/:id', verifyAdmin, c.deleteWarehouse);


module.exports = router;
