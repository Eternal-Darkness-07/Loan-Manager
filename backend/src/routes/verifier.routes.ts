// src/routes/verifier.routes.ts

import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getPendingVerificationApplications, 
  verifyApplication, 
  rejectApplication 
} from '../controllers/verifier.controller';

const router = express.Router();

// Only VERIFIER can access these routes.
router.use(authenticate, authorize(["VERIFIER"]));

// List applications pending verification.
router.get('/pending-loan-applications', getPendingVerificationApplications);

// Verify or reject an application.
router.post('/loan-applications/:id/verify', verifyApplication);
router.post('/loan-applications/:id/reject', rejectApplication);

export default router;
