import express from 'express';

import {
  registerUser,
  loginUser,
  // refreshToken,
  // logoutUser,
  getProfile
} from '../controllers/auth.controller.js';

import {
  authenticateToken
} from '../middleware/auth.middleware.js';

const authRoutes = express.Router();

/**
 * Public Routes
 */

// Register User
authRoutes.post('/register', registerUser);

// Login User
authRoutes.post('/login', loginUser);

// Refresh Access Token
// authRoutes.post('/refresh-token', refreshToken);

/**
 * Protected Routes
 */

// Logged In User Profile
authRoutes.get(
  '/profile',
  authenticateToken,
  getProfile
);

// Logout
// authRoutes.post(
//   '/logout',
//   // authenticateToken,
//   logoutUser
// );

export default authRoutes;