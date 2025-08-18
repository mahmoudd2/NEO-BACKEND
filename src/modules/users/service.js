const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repo = require('./models');
const mailer = require('../../utils/mailer');

/** Create user with a generated (hashed) temp password */
exports.createUser = async (payload) => {
  const generatedPassword = Math.random().toString(36).slice(-8);
  const hashed = await bcrypt.hash(generatedPassword, 10);
  const user = await repo.create({ ...payload, password: hashed });
  return { user, generatedPassword };
};

/** Reads */
exports.list = () => repo.list();
exports.listByCompany = (companyId) => repo.listByCompany(companyId);
exports.getById = (id) => repo.getById(id);

/** Update / Remove */
exports.update = (id, body) => repo.update(id, body);
exports.remove = (id) => repo.remove(id);

/** Reset password (admin-triggered) + email temp password */
exports.resetPassword = async (id) => {
  const user = await (repo.getEmailById ? repo.getEmailById(id) : repo.getById(id));
  if (!user) return { ok: false, message: 'User not found' };
  if (!user.Email) return { ok: false, message: 'User has no email on file' };

  const generatedPassword = Math.random().toString(36).slice(-10);
  const hashed = await bcrypt.hash(generatedPassword, 10);
  await repo.setPassword(id, hashed);

  const subject = 'Your password has been reset';
  const text = `Hi${user.FirstName ? ' ' + user.FirstName : ''},
Your temporary password is: ${generatedPassword}
Please log in and change it immediately.`;
  const html = `<p>Hi${user.FirstName ? ' ' + user.FirstName : ''},</p>
<p>Your temporary password is: <b>${generatedPassword}</b></p>
<p>Please log in and change it immediately.</p>
<p>— ${process.env.APP_NAME || 'Our App'}</p>`;

  await mailer.sendMail({ to: user.Email, subject, text, html });

  return { ok: true, message: 'Password reset. Email sent to user.' };
};

/** Change my password (self-service) */
exports.changeMyPassword = async (userId, oldPassword, newPassword) => {
  const user = await repo.getById(userId);
  if (!user) return { ok: false, message: 'User not found' };

  const ok = await bcrypt.compare(oldPassword, user.Password);
  if (!ok) return { ok: false, message: 'Old password is incorrect' };

  const hashed = await bcrypt.hash(newPassword, 10);
  await repo.setPassword(userId, hashed);
  return { ok: true, message: 'Password changed successfully' };
};

/** User login → JWT marked as a user (role + companyId included) */
exports.login = async (email, password) => {
  const user = await repo.findUserByEmail(email);
  if (!user) return { ok: false, message: 'Invalid credentials' };

  // If dev DB stores plain text temporarily, use: const ok = password === user.Password;
  const ok = await bcrypt.compare(password, user.Password);
  if (!ok) return { ok: false, message: 'Invalid credentials' };

  let role = 'user';
  try {
    const r = await repo.getRoleName(user.RoleID);
    if (r?.Name) role = r.Name;
  } catch (_) {}

  const token = jwt.sign(
    { sub: user.id, email: user.Email, role, companyId: user.CompanyID, type: 'user' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  const { Password, ...safe } = user;
  return { ok: true, token, user: { ...safe, role } };
};
