import express from 'express';

import {
  getActivityLogs,
  getAllActivities,
  getLeadActivities
} from '../controllers/activity.controller.js';

import {
  authenticateToken,
  authorizeRoles
} from '../middleware/auth.middleware.js';

const activityRoutes = express.Router();

/**
 * Activity Logs
 */

// All Activities
// activityRoutes.get(
//   '/',
//   authenticateToken,
//   getAllActivities
// );

// Activity By Lead
activityRoutes.get(
  '/:leadId',
  authenticateToken,
  getLeadActivities
);

activityRoutes.get(
  "/",
  authenticateToken,
  authorizeRoles(
    "ADMIN",
    "MANAGER"
  ),
  getActivityLogs
);
export default activityRoutes;