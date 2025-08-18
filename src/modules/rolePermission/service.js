// Service layer for role-permission linking
const repo = require('./models');

exports.linkPermissionsToRole = async (roleId, permissionIds) => {
  // Optional: validate role & permissions exist
  const role = await repo.getRole(roleId);
  if (!role) return { ok: false, message: 'Role not found' };

  const perms = await repo.getExistingPermissions(permissionIds);
  const existingIds = new Set(perms.map(p => p.id));
  const missing = permissionIds.filter(id => !existingIds.has(Number(id)));

  const result = await repo.addMany(roleId, permissionIds);
  return { ok: true, ...result, missing };
};

exports.getPermissionsByRoleId = (roleId) => repo.listByRole(roleId);

exports.deletePermissionsByRoleId = async (roleId) => {
  const deleted = await repo.removeByRole(roleId);
  return { ok: true, deleted };
};
