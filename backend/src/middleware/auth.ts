import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { id: string, role: string};
}

export const authenticate:RequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        req.user = decoded as { id: string, role: string };
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: "Invalid token" });
        return;
    }
};

export const authorize = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user?.role!)) {
            console.error("Authorization error: User role not allowed", req.user?.role);
            res.status(403).json({ message: "Access denied" });
            return; 
        }
        next();
    };
}