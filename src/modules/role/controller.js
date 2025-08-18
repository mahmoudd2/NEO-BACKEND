const s = require('./service');

const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};


exports.createRole = async (req, res) => {
  const { roleName, description } = req.body;
  if (!roleName || !description) {
    return res.status(400).json({ message: 'Role name and description are required' });
  }
  try {
    const result = await s.createRole(roleName, description);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create role' });
  }
}
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await s.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
}
exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await s.getRoleById(id);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch role' });
  }
}
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await s.updateRole(id, updateData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update role' });
  }
}
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await s.deleteRole(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete role' });
  }
}
