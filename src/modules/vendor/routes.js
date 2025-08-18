const router = require('express').Router();
const c = require('./controller');
const { verifyAdmin } = require('../middleware/auth');


// Save a Vendor
router.post('/', verifyAdmin, c.saveVendorDetails);

// Get all Vendors
router.get('/', verifyAdmin, c.getAllVendors);
router.delete('/:id', verifyAdmin, c.deleteVendor);

module.exports = router;
