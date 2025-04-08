"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const loan_routes_1 = __importDefault(require("./routes/loan.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const verifier_routes_1 = __importDefault(require("./routes/verifier.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/loan-applications', loan_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/verifier', verifier_routes_1.default);
app.use('/api/user', user_routes_1.default);
exports.default = app;
