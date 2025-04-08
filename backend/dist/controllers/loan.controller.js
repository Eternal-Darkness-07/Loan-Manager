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
exports.applyLoan = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const applyLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // assuming middleware adds user to req
    const { fullName, address, tenureMonths, reason, amount, employmentStatus, employmentAddress, acceptedTerms, } = req.body;
    if (!acceptedTerms) {
        res.status(400).json({ message: 'You must accept the terms and conditions' });
        return;
    }
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    try {
        const loanApplication = yield prisma.loanApplication.create({
            data: {
                userId,
                fullName,
                address,
                tenureMonths,
                reason,
                amount,
                employmentStatus,
                employmentAddress,
                acceptedTerms,
            },
        });
        res.status(201).json({ message: 'Loan application submitted', loanApplication });
        return;
    }
    catch (error) {
        console.error('Loan apply error:', error);
        res.status(500).json({ message: 'Something went wrong' });
        return;
    }
});
exports.applyLoan = applyLoan;
