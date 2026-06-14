import express from 'express';

import {
  createLead,
  updateLead,
  deleteLead,
  getLeadById,
  getAllLeads,
  assignLead,
  updateLeadStatus
} from '../controllers/lead.controller.js';

import {
  authenticateToken,
  authorizeRoles
} from '../middleware/auth.middleware.js';

const leadRoutes = express.Router();

/**
 * Create Lead
 * Admin / Manager
 */
leadRoutes.post(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER'),
  createLead
);

/**
 * List Leads
 * Admin / Manager / Agent
 */
leadRoutes.get(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER', 'AGENT'),
  getAllLeads
);

/**
 * Get Lead By Id
 */
leadRoutes.get(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER', 'AGENT'),
  getLeadById
);

/**
 * Update Lead
 */
leadRoutes.put(
  '/:id',
  authenticateToken, 
  authorizeRoles('ADMIN', 'MANAGER'),
  updateLead
);

/**
 * Delete Lead
 */
leadRoutes.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(
    "ADMIN",
    "MANAGER"
  ),
  deleteLead
);

/**
 * Manual Assignment
 */
leadRoutes.patch(
  '/:id/assign',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER'),
  assignLead
);

/**
 * Update Status
 */
leadRoutes.patch(
  '/:id/status',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER', 'AGENT'),
  updateLeadStatus
);

export default leadRoutes;