import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function authenticate(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) throw new Error();
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}
