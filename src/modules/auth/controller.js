const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../config/knex');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await db('UserAccount').where({ Email: email }).first();

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Get role name
    const role = await db('Role').where({ id: user.RoleID }).first();

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.Email, role: role.Name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({ token, role: role.Name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
