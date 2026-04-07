const User = require('../models/User');
const authMiddleware = require('./auth');

module.exports = async function requireAdmin(req, res, next) {
  authMiddleware(req, res, async () => {
    try {
      if (req.user?.role === 'admin') {
        return next();
      }

      const user = await User.findById(req.user?.userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      req.user.role = user.role;
      next();
    } catch (err) {
      res.status(500).json({ message: 'Failed to verify admin access' });
    }
  });
};