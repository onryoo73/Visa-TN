// Middleware to protect admin routes using a simple token passed in `x-admin-token` header.
module.exports = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.headers['x-api-token'];
  const expected = process.env.ADMIN_TOKEN || '';
  if (!expected) {
    return res.status(403).json({
      success: false,
      message: 'Admin access not configured. Set ADMIN_TOKEN in server/.env and restart the server.',
    });
  }
  if (!token || token !== expected) {
    return res.status(401).json({ success: false, message: 'Unauthorized: invalid admin token' });
  }
  next();
};
