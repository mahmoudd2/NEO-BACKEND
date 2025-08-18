const router = require('express').Router();
const { verifyAdmin } = require('../../middleware/auth');
const c = require('./controller');


// Register new company 
router.post('/', verifyAdmin, c.createCompany);

// Get all companies
router.get('/', verifyAdmin, c.getAllCompanies);

// Get a company by ID
router.get('/:id', verifyAdmin, c.getCompanyById);

// Delete a company
router.delete('/:id', verifyAdmin, c.deleteCompany);

// Update a company
router.put('/:id', verifyAdmin, c.updateCompany);


module.exports = router;