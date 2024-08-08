// middleware/routeProtection.js
import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    req.userId = decoded.id;
    next();
  });
};
