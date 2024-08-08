import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';

export const ensureAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = { _id: decoded.id }; // Ensure this matches how your token encodes user info
    next();
  });
};

export const ensureGuest = (req, res, next) => {
  // Replace with your actual authentication check
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};
