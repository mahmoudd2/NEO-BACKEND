const s = require('./service');

const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};


exports.linkPermissionsToRole = async (req, res) => {
  const { roleId, permissionIds } = req.body;
  if (!roleId || !Array.isArray(permissionIds) || permissionIds.length === 0) {
    return res.status(400).json({ message: 'Role ID and at least one permission ID are required' });
  }
  
  try {
    const result = await s.linkPermissionsToRole(roleId, permissionIds);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to link permissions to role' });
  }
}
exports.getPermissionsByRoleId = async (req, res) => {
  const { id } = req.params;
  try {
    const permissions = await s.getPermissionsByRoleId(id);
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch permissions by role ID' });
  }
}
exports.deletePermissionsByRoleId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await s.deletePermissionsByRoleId(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete permissions by role ID' });
  }
}