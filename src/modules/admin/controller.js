const service = require('./service');

exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const result = await service.login(email, password);
    if (!result.ok) return res.status(401).json({ message: result.message });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboard = async (_req, res, next) => {
  try {
    const data = await service.dashboard();
    res.json(data);
  } catch (e) {
    next(e);
  }
};
