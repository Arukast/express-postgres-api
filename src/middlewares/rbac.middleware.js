const AppError = require('../utils/AppError'); // Akan dibuat di Bab 10

module.exports = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user || !requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Akses ditolak.' });
    }
    next();
  };
};