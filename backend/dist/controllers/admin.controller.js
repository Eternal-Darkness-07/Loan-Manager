"use strict";
// src/controllers/admin.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.addAdmin = exports.getAllUsers = exports.rejectApplication = exports.approveApplication = exports.getPendingApplications = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const getPendingApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // List applications that have been verified (ready for admin decision)
        const applications = yield prisma.loanApplication.findMany({
            where: { status: 'VERIFIED' },
            include: { user: true },
        });
        res.status(200).json({ applications });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching applications", error });
    }
});
exports.getPendingApplications = getPendingApplications;
const approveApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const application = yield prisma.loanApplication.update({
            where: { id },
            data: { status: 'APPROVED' },
        });
        res.status(200).json({ message: "Application approved", application });
    }
    catch (error) {
        res.status(500).json({ message: "Error approving application", error });
    }
});
exports.approveApplication = approveApplication;
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
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            where: { role: { in: ['ADMIN', 'VERIFIER'] } },
        });
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});
exports.getAllUsers = getAllUsers;
// Admin management: add an admin by updating a user's role.
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        res.status(200).json({ message: "User updated to admin", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user to admin", error });
    }
});
exports.addAdmin = addAdmin;
// Delete an admin user.
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.delete({
            where: { id },
        });
        res.status(200).json({ message: "Admin deleted", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting admin", error });
    }
});
exports.deleteAdmin = deleteAdmin;
