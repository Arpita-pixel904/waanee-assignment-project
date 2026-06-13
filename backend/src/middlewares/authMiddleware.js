import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js'; // <-- Import Prisma here

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Prisma: Fetch user securely without the password
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'The user belonging to this token no longer exists' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
  }
};

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to perform this action',
      });
    }
    next();
  };
};