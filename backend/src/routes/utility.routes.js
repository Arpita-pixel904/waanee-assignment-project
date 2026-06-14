import express from 'express';

import {
  enrichLead
} from '../controllers/utility.controller.js';

import {
  authenticateToken
} from '../middleware/auth.middleware.js';

const utilityRoutes = express.Router();

/**
 * External API Utilities
 */

// Enrich Lead Information
utilityRoutes.post(
  '/enrich-lead',
  authenticateToken,
  enrichLead
);

export default utilityRoutes;