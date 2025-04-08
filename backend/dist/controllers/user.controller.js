"use strict";
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
exports.getApprovedApplications = exports.getPendingVerificationApplications = exports.getTotalApplications = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTotalApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // List all applications for the authenticated user
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const applications = yield prisma.loanApplication.findMany({
            where: { userId: userId },
            include: { user: true },
        });
        console.log("Total applications fetched:", applications);
        res.status(200).json({ applications });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching applications", error });
    }
});
exports.getTotalApplications = getTotalApplications;
const getPendingVerificationApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // List applications that have not yet been verified
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const applications = yield prisma.loanApplication.findMany({
            where: { userId: userId, status: "PENDING" },
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
const getApprovedApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // List applications that have not yet been verified
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const applications = yield prisma.loanApplication.findMany({
            where: { userId: userId, status: "APPROVED" },
            include: { user: true },
        });
        console.log("Approved applications fetched:", applications);
        res.status(200).json({ applications });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching applications", error });
    }
});
exports.getApprovedApplications = getApprovedApplications;
