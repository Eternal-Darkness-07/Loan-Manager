import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getTotalApplications, getPendingVerificationApplications, getApprovedApplications } from '../controllers/user.controller';

const router = express.Router();

router.get('/applications/:id', authenticate, authorize(['USER']), getTotalApplications);
router.get('/applications/:id/pending', authenticate, authorize(['USER']), getPendingVerificationApplications);
router.get('/applications/:id/approved', authenticate, authorize(['USER']), getApprovedApplications);

export default router;