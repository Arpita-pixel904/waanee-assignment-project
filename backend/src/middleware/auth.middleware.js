import {
  verifyAccessToken
} from '../utils/jwtutils.js';

export const authenticateToken =
  async (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization;

      if (
        !authHeader ||
        !authHeader.startsWith('Bearer ')
      ) {
        return res.status(401).json({
          success: false,
          message: 'Token required'
        });
      }

      const token =
        authHeader.split(' ')[1];

      const decoded =
        verifyAccessToken(token);

      req.user = decoded;

      next();

    } catch (error) {

      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });

    }
};

export const authorizeRoles =
  (...roles) => {

    return (req, res, next) => {

      if (
        !roles.includes(req.user.role)
      ) {

        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });

      }

      next();
    };
};