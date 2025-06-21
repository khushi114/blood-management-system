import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to verify token and attach user
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next(); // Proceed if user is found
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Additional middleware to check for admin role
const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
export { authMiddleware, isAdmin };

