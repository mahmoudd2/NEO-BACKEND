const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repo = require('./models');

exports.login = async (email, password) => {
  const admin = await repo.findAdminByEmail(email);
  if (!admin) return { ok: false, message: 'Invalid credentials' };

  // If your seed stored plain text (for now), swap to: const ok = password === admin.Password;
  const ok = await bcrypt.compare(password, admin.Password);
  if (!ok) return { ok: false, message: 'Invalid credentials' };

  const token = jwt.sign(
    { id: admin.id, email: admin.Email, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return {
    ok: true,
    token,
    admin: {
      id: admin.id,
      userName: admin.UserName,
      firstName: admin.FirstName,
      lastName: admin.LastName,
      email: admin.Email,
    }
  };
};

exports.dashboard = async () => {
  const [companies, users, warehouses, activity] = await Promise.all([
    repo.countCompanies(),
    repo.countUsers(),
    repo.countWarehouses(),
    repo.recentActivity()
  ]);

  return {
    kpis: { companies, users, warehouses },
    recentActivity: activity
  };
};
