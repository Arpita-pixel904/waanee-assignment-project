import express from 'express';

import {
  getAllActivities,
  getLeadActivities
} from '../controllers/activity.controller.js';

import {
  authenticateToken
} from '../middleware/auth.middleware.js';

const activityRoutes = express.Router();

/**
 * Activity Logs
 */

// All Activities
activityRoutes.get(
  '/',
  authenticateToken,
  getAllActivities
);

// Activity By Lead
activityRoutes.get(
  '/:leadId',
  authenticateToken,
  getLeadActivities
);

export default activityRoutes;