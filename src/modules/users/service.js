const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repo = require('./models');

exports.login = async (email, password) => {
  const user = await repo.findUserByEmail(email);
  if (!user) return { ok: false, message: 'Invalid credentials' };

  // If current DB passwords are plain text (dev), temporarily do:
  // const ok = password === user.Password;
  const ok = await bcrypt.compare(password, user.Password);
  if (!ok) return { ok: false, message: 'Invalid credentials' };

  // Optional: fetch role name; default to "user"
  let role = 'user';
  try {
    const r = await repo.getRoleName(user.RoleID);
    if (r?.Name) role = r.Name;
  } catch (_) {}

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.Email,
      role,                 // ← says it is a user (or specific role name)
      companyId: user.CompanyID,
      type: 'user'          // explicit marker if you want to distinguish from admin
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  const { Password, ...safe } = user;
  return { ok: true, token, user: { ...safe, role } };
};
