import express from 'express';
import { createLead, getAllLeads, getLeadById, updateLead, deleteLead } from '../controllers/leadController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(restrictTo('ADMIN', 'MANAGER'), createLead)
  .get(getAllLeads);

router.route('/:id')
  .get(getLeadById) // The missing API!
  .put(updateLead)
  .delete(restrictTo('ADMIN', 'MANAGER'), deleteLead);

export default router;