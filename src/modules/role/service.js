// Service layer for Roles
const repo = require('./models');

exports.createRole = (roleName, description) => repo.create({ roleName, description });
exports.getAllRoles = () => repo.list();
exports.getRoleById = (id) => repo.getById(id);
exports.updateRole = (id, updateData) => repo.update(id, updateData);
exports.deleteRole = (id) => repo.remove(id);
