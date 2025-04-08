import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import { applyLoan } from "../controllers/loan.controller";

const router = express.Router();

router.post("/apply", authenticate, authorize(["USER"]), applyLoan);

export default router;
