const s = require('./service');

// tiny validator like in your snippet
const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};

exports.createUser = async (req, res) => {
  const required = ['roleId', 'companyId', 'userName', 'firstName', 'lastName', 'email'];
  const error = validateFields(req.body, required);
  if (error) return res.status(400).json({ message: error });

  try {
    const { user, generatedPassword } = await s.createUser(req.body);
    return res.status(201).json({
      message: 'User created successfully',
      user,
      generatedPassword // shown once so admin can share
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to create user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const result = await s.login(email, password);
    if (!result.ok) return res.status(401).json({ message: result.message });
    return res.json(result);
  } catch (e) {
    console.error('[users.login] error:', e);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (_req, res) => {
  try {
    const users = await s.list();
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.getUsersByCompany = async (req, res) => {
  const { companyId } = req.params;
  if (!companyId) return res.status(400).json({ message: 'Company ID is required' });

  try {
    const users = await s.listByCompany(companyId);
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to fetch users for this company' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'User ID is required' });

  try {
    const user = await s.getById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to fetch user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'User ID is required' });

  try {
    const updated = await s.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User updated', user: updated });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'User ID is required' });

  try {
    await s.remove(id);
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};

exports.resetPassword = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'User ID is required' });

  try {
    const result = await s.resetPassword(id);
    if (!result.ok) return res.status(400).json({ message: result.message });
    return res.json({ message: result.message });
  } catch (e) {
    console.error('resetPassword error:', e);
    return res.status(500).json({ message: 'Password updated, but failed to send email.' });
  }
};

exports.changeMyPassword = async (req, res) => {
  const userId = req.user?.id;  // set by auth middleware after verifying JWT
  const { oldPassword, newPassword } = req.body || {};

  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Old and new passwords are required' });
  }

  try {
    const result = await s.changeMyPassword(userId, oldPassword, newPassword);
    if (!result.ok) return res.status(401).json({ message: result.message });
    return res.json({ message: result.message });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to change password' });
  }
};
