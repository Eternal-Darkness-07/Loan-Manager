"use strict";
// src/routes/admin.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
// Only ADMIN can access these routes
router.use(auth_1.authenticate, (0, auth_1.authorize)(["ADMIN"]));
// Get verified applications ready for final admin decision.
router.get('/loan-applications', admin_controller_1.getPendingApplications);
// Approve or reject a loan application.
router.post('/loan-applications/:id/approve', admin_controller_1.approveApplication);
router.post('/loan-applications/:id/reject', admin_controller_1.rejectApplication);
// Admin management endpoints.
router.get('/users', admin_controller_1.getAllUsers); // Get all admins/verifiers
router.post('/add', admin_controller_1.addAdmin);
router.delete('/:id', admin_controller_1.deleteAdmin);
exports.default = router;
