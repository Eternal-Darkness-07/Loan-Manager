// src/routes/admin.routes.ts

import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getPendingApplications, 
  approveApplication, 
  rejectApplication, 
  addAdmin, 
  deleteAdmin,
  getAllUsers 
} from '../controllers/admin.controller';

const router = express.Router();

// Only ADMIN can access these routes
router.use(authenticate, authorize(["ADMIN"]));

// Get verified applications ready for final admin decision.
router.get('/loan-applications', getPendingApplications);

// Approve or reject a loan application.
router.post('/loan-applications/:id/approve', approveApplication);
router.post('/loan-applications/:id/reject', rejectApplication);

// Admin management endpoints.
router.get('/users', getAllUsers); // Get all admins/verifiers
router.post('/add', addAdmin);
router.delete('/:id', deleteAdmin);

export default router;