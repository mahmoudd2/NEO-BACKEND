const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}


exports.addAlert = async (req, res) => {
    const requiredFields = ['ProductID', 'StockID', 'WarehouseID', 'Type', 'Channel']
    const validationError = validateFields(req.body, requiredFields);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    try {
      const alert = await s.addAlert(req.body);
      return res.status(201).json(alert);
    } catch (error) {
      console.error('Error adding alert:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  
  }
  exports.deleteAlert = async (req, res) => {
    try {
      const result = await s.deleteAlert(req.params.id);
      if (result) {
        return res.status(200).json({ message: 'Alert deleted successfully' });
      } else {
        return res.status(404).json({ error: 'Alert not found' });
      }
    } catch (error) {
      console.error('Error deleting alert:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  exports.getAllAlerts = async (req, res) => {
  
    try {
      const alerts = await s.getAllAlerts();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch alerts' });
    }
  }
  