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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role = 'USER' } = req.body;
    try {
        const exsitingUser = yield prisma.user.findUnique({ where: { email } });
        if (exsitingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });
        res.status(201).json({ message: 'Registration successful', user });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Registration failed", error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        console.log("Login successful:", user);
        res.status(200).json({ message: "Login successful", token, user });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed", error });
    }
});
exports.login = login;
