"use strict";
// src/controllers/verifier.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectApplication = exports.verifyApplication = exports.getPendingVerificationApplications = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPendingVerificationApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // List applications that have not yet been verified
        const applications = yield prisma.loanApplication.findMany({
            where: { status: 'PENDING' },
            include: { user: true },
        });
        console.log("Pending applications fetched:", applications);
        res.status(200).json({ applications });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching applications", error });
    }
});
exports.getPendingVerificationApplications = getPendingVerificationApplications;
const verifyApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const application = yield prisma.loanApplication.update({
            where: { id },
            data: { status: 'VERIFIED' },
        });
        res.status(200).json({ message: "Application verified", application });
    }
    catch (error) {
        res.status(500).json({ message: "Error verifying application", error });
    }
});
exports.verifyApplication = verifyApplication;
const rejectApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const application = yield prisma.loanApplication.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
        res.status(200).json({ message: "Application rejected", application });
    }
    catch (error) {
        res.status(500).json({ message: "Error rejecting application", error });
    }
});
exports.rejectApplication = rejectApplication;
