import express from 'express';

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAgents
} from '../controllers/user.controller.js';

import {
  authenticateToken,
  authorizeRoles
} from '../middleware/auth.middleware.js';

const userRoutes = express.Router();

/**
 * User Management
 */

// Create User
userRoutes.post(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN'),
  createUser
);

// List Users
userRoutes.get(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN'),
  getUsers
);

// Get User By Id
userRoutes.get(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  getUserById
);

// Update User
userRoutes.put(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  updateUser
);

// Delete User
userRoutes.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  deleteUser
);

// Get All Agents
userRoutes.get(
  '/agents/list',
  authenticateToken,
  getAgents
);

export default userRoutes;