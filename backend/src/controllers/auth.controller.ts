import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role = 'USER' } = req.body;

    try {
        const exsitingUser = await prisma.user.findUnique({where:{email}});
        if(exsitingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        res.status(201).json({message: 'Registration successful', user});
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Registration failed", error });
    }
};
export const login: RequestHandler =  async (req:Request, res:Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        });

        console.log("Login successful:", user);
        res.status(200).json({message: "Login successful", token, user});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed", error });
    }
};

