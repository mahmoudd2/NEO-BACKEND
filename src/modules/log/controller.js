const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}

exports.addLog = async (req, res) => {
  const { userId, action, objectId, objectType, timestamp, gps_location, note } = req.body;
  if (!userId || !action || !objectId || !objectType) {
    return res.status(400).json({ message: 'User ID, action, object ID, and object type are required' });
  }
  try {
    const result = await s.addLog(userId, action, objectId, objectType, timestamp || new Date(), gps_location, note);
    res.status(201).json({ logId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add log' });
  }
}

exports.editLog = async (req, res) => {
  const { logId, userId, action, objectId, objectType, timestamp, gps_location, note } = req.body;
  if (!logId || !userId || !action || !objectId || !objectType) {
    return res.status(400).json({ message: 'Log ID, user ID, action, object ID, and object type are required' });
  }
  try {
    const result = await s.editLog(logId, userId, action, objectId, objectType, timestamp || new Date(), gps_location, note);
    res.status(200).json({ logId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to edit log' });
  }
}

exports.deleteLog = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Log ID is required' });
  }
  try {
    const result = await s.deleteLog(id);
    res.status(200).json({ message: 'Log deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete log' });
  }
}
