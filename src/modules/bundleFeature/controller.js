const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}

exports.addBundleFeature = async (req, res) => {
    const { bundleId, featureId } = req.body;
    if (!bundleId || !featureId) {
      return res.status(400).json({ message: 'Bundle ID and Feature ID are required' });
    }
    try {
      const result = await s.addBundleFeature(bundleId, featureId);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add bundle feature' });
    }
  }
  
  exports.editBundleFeature = async (req, res) => {
    const { bundleFeatureId, bundleId, featureId } = req.body;
    if (!bundleFeatureId || !bundleId || !featureId) {
      return res.status(400).json({ message: 'BundleFeature ID, Bundle ID, and Feature ID are required' });
    }
    try {
      const result = await s.editBundleFeature(bundleFeatureId, bundleId, featureId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to edit bundle feature' });
    }
  }
  
  exports.deleteBundleFeature = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'BundleFeature ID is required' });
    }
    try {
      const result = await s.deleteBundleFeature(id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete bundle feature' });
    }
  }