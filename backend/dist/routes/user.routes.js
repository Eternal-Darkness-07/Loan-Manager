"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.get('/applications/:id', auth_1.authenticate, (0, auth_1.authorize)(['USER']), user_controller_1.getTotalApplications);
router.get('/applications/:id/pending', auth_1.authenticate, (0, auth_1.authorize)(['USER']), user_controller_1.getPendingVerificationApplications);
router.get('/applications/:id/approved', auth_1.authenticate, (0, auth_1.authorize)(['USER']), user_controller_1.getApprovedApplications);
exports.default = router;
