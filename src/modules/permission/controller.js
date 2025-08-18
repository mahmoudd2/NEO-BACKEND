const s = require('./service.js');
const bcrypt = require('bcrypt');

function validateFields(body, requiredFields) {
  const missing = requiredFields.filter(field => !body[field]?.toString().trim());
  return missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : null;
}

exports.createPermission = async (req, res) => {
  const { permissionName, description } = req.body;
  if (!permissionName || !description) {
    return res.status(400).json({ message: 'Permission name and description are required' });
  }
  try {
    const result = await s.createPermission(permissionName, description);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create permission' });
  }
}

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await s.getAllPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch permissions' });
  }
}

exports.getPermissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const permission = await s.getPermissionById(id);
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch permission' });
  }
}
exports.updatePermission = async (req, res) => {
  const { id } = req.params;
  const { permissionName, description } = req.body;
  try {
    const result = await s.updatePermission(id, permissionName, description);
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to update permission' });
  }
}
exports.deletePermission = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await s.deletePermission(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete permission' });
  }
}