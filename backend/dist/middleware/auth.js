"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: "Invalid token" });
        return;
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        var _a, _b;
        if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
            console.error("Authorization error: User role not allowed", (_b = req.user) === null || _b === void 0 ? void 0 : _b.role);
            res.status(403).json({ message: "Access denied" });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
