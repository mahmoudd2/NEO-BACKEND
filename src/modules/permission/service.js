const m = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createPermission = async (permissionName, description) => {
  const result = await m.createPermission(permissionName, description);
  return result;
}
exports.getAllPermissions = async () => {
  return await m.getAllPermissions();
}
exports.getPermissionById = async (id) => {
  return await m.getPermissionById(id);
}
exports.updatePermission = async (id, permissionName, description) => {
  return await m.updatePermission(id, permissionName, description);
}
exports.deletePermission = async (id) => {
  return await m.deletePermission(id);
}