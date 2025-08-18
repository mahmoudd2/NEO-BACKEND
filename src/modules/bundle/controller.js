const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}

exports.addBundle = async (req, res) => {
    const { name, price, description } = req.body;
    console.log(req.body);
    if (!name || !price || !description) {
      return res.status(400).json({ message: 'Name, price, and description are required' });
    }
    try {
      const result = await s.addBundle(name, price, description);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add bundle' });
    }
  }
  exports.editBundle = async (req, res) => {
    const { bundleId, name, price, description } = req.body;
    if (!bundleId || !name || !price || !description) {
      return res.status(400).json({ message: 'Bundle ID, name, price, and description are required' });
    }
    try {
      const result = await s.editBundle(bundleId, name, price, description);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to edit bundle' });
    }
  }
  
  exports.deleteBundleById = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'Bundle ID is required' });
    }
  
    try {
      const deletedBundle = await s.deleteBundleById(id);
  
      if (!deletedBundle) {
        return res.status(404).json({ message: 'Bundle not found or already deleted' });
      }
  
      res.status(200).json({ message: 'Bundle deleted successfully', deletedBundle });
    } catch (error) {
      console.error('Error deleting bundle:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
exports.getAllBundles = async (req, res) => {
    try {
      const bundles = await s.getAllBundles();
      res.status(200).json(bundles);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch bundles' });
    }
  }
