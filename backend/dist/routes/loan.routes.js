"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const loan_controller_1 = require("../controllers/loan.controller");
const router = express_1.default.Router();
router.post("/apply", auth_1.authenticate, (0, auth_1.authorize)(["USER"]), loan_controller_1.applyLoan);
exports.default = router;
