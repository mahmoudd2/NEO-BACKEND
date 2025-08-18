const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}

exports.createCompany = async (req, res) => {
    const requiredFields = ['name', 'industry', 'email'];
    const validationError = validateFields(req.body, requiredFields);
  
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
  
    try {
      const result = await s.createCompany(req.body);
      res.status(201).json(result); // now returns { companyId: 12 }
  
    } catch (error) {
          console.error(error);
  
          if (error.code === '23505') {
              // PostgreSQL unique violation
              return res.status(400).json({ message: 'Email already exists. Please use a different one.' });
          }
  
          res.status(500).json({ message: 'Failed to create company' });
      }
  
  };
  
  exports.getAllCompanies = async (req, res) => {
    try {
      const companies = await s.getAllCompanies();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch companies' });
    }
  };
  
  exports.getCompanyById = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'Company ID is required' });
    }
  
    try {
      const company = await s.getCompanyById(id);
      if (!company) return res.status(404).json({ message: 'Company not found' });
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch company' });
    }
  };
  
  exports.deleteCompany = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'Company ID is required' });
    }
  
    try {
      await s.deleteCompany(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete company' });
    }
  };
  
  exports.updateCompany = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    if (!id) {
      return res.status(400).json({ message: 'Company ID is required' });
    }
  
    try {
      const updated = await s.updateCompany(id, updateData);
  
      if (!updated) {
        return res.status(404).json({ message: 'Company not found or not updated' });
      }
  
      res.status(200).json({ message: 'Company updated successfully' });
    } catch (error) {
      console.error('Error updating company:', error);
      res.status(500).json({ message: 'Failed to update company' });
    }
  };
  