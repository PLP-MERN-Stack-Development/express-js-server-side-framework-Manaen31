const authenticate = require('../middleware/auth');
module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing Authorization header' });

  const token = header.split(' ')[1];
  if (token !== process.env.API_TOKEN) return res.status(403).json({ message: 'Invalid token' });

  next();
};
