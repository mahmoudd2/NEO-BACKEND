const bcrypt = require('bcryptjs');
const repo = require('./models');
const mailer = require('../../utils/mailer');
const service = require('./service');

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
    // generate + hash password
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const userPayload = { ...req.body, password: hashedPassword };
    const user = await repo.create(userPayload);

    return res.status(201).json({
      message: 'User created successfully',
      user,                // no password included
      generatedPassword    // sent once so the admin can share it
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
    const result = await service.login(email, password);
    if (!result.ok) return res.status(401).json({ message: result.message });
    return res.json(result);
  } catch (e) {
    console.error('[users.login] error:', e);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (_req, res) => {
  try {
    const users = await repo.list();
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
    const users = await repo.listByCompany(companyId);
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
    const user = await repo.getById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to fetch user' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'User ID is required' });

  try {
    await repo.remove(id);
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};


/** UPDATE USER */
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'User ID is required' });

  try {
    const updated = await repo.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User updated', user: updated });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to update user' });
  }
};

/** RESET PASSWORD (admin-triggered) */
exports.resetPassword = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'User ID is required' });

  try {
    // get user with Email (ensure your repo returns Email)
    const user = await (repo.getEmailById ? repo.getEmailById(id) : repo.getById(id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.Email) return res.status(400).json({ message: 'User has no email on file' });

    // generate + hash temp password
    const generatedPassword = Math.random().toString(36).slice(-10);
    const hashed = await bcrypt.hash(generatedPassword, 10);
    await repo.setPassword(id, hashed);

    // send email
    const subject = 'Your password has been reset';
    const text = `Hi${user.FirstName ? ' ' + user.FirstName : ''},
    Your temporary password is: ${generatedPassword}
    Please log in and change it immediately.`;

    const html = `<p>Hi${user.FirstName ? ' ' + user.FirstName : ''},</p>
    <p>Your temporary password is: <b>${generatedPassword}</b></p>
    <p>Please log in and change it immediately.</p>
    <p>— ${process.env.APP_NAME || 'Our App'}</p>`;

    await mailer.sendMail({ to: user.Email, subject, text, html });

    return res.json({ message: 'Password reset. Email sent to user.' });
  } catch (e) {
    console.error('resetPassword error:', e);
    return res.status(500).json({ message: 'Password updated, but failed to send email.' });
  }
};

exports.changeMyPassword = async (req, res) => {
  const userId = req.user?.id; // set by your auth middleware
  const { oldPassword, newPassword } = req.body || {};
  if (!userId || !oldPassword || !newPassword)
    return res.status(400).json({ message: 'oldPassword and newPassword are required' });

  try {
    const user = await repo.getById(userId);
    const ok = await bcrypt.compare(oldPassword, user.Password);
    if (!ok) return res.status(401).json({ message: 'Old password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await repo.setPassword(userId, hashed);

    res.json({ message: 'Password changed successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to change password' });
  }
};
