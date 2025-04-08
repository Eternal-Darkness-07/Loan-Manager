"use strict";
// src/routes/verifier.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const verifier_controller_1 = require("../controllers/verifier.controller");
const router = express_1.default.Router();
// Only VERIFIER can access these routes.
router.use(auth_1.authenticate, (0, auth_1.authorize)(["VERIFIER"]));
// List applications pending verification.
router.get('/pending-loan-applications', verifier_controller_1.getPendingVerificationApplications);
// Verify or reject an application.
router.post('/loan-applications/:id/verify', verifier_controller_1.verifyApplication);
router.post('/loan-applications/:id/reject', verifier_controller_1.rejectApplication);
exports.default = router;
