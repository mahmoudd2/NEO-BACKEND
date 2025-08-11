const jwt = require('jsonwebtoken');

exports.verifyAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
    req.user = decoded; next();
  } catch { return res.status(403).json({ message: 'Invalid or expired token' }); }
};

exports.verifyCompanyManager = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    if (decoded.role !== 'companyManager') return res.status(403).json({ message: 'Company Managers only' });
    req.user = decoded; next();
  } catch { return res.status(403).json({ message: 'Invalid or expired token' }); }
};
