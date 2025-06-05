const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }

    next(); // User has the required role
  };
};

export default roleMiddleware;
