const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}

exports.addFeature = async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
    try {
      const result = await s.addFeature(name, description);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add feature' });
    }
  }
  exports.editFeature = async (req, res) => {
    const { featureId, name, description } = req.body;
    if (!featureId || !name || !description) {
      return res.status(400).json({ message: 'Feature ID, name, and description are required' });
    }
    try {
      const result = await s.editFeature(featureId, name, description);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to edit feature' });
    }
  }
  exports.deleteFeatureById = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'Feature ID is required' });
    }
  
    try {
      const deletedFeature = await s.deleteFeatureById(id);
  
      if (!deletedFeature) {
        return res.status(404).json({ message: 'Feature not found or already deleted' });
      }
  
      res.status(200).json({ message: 'Feature deleted successfully', deletedFeature });
    } catch (error) {
      console.error('Error deleting feature:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };