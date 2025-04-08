import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getTotalApplications = async (req: AuthRequest, res: Response) => {
  try {
    // List all applications for the authenticated user
    const userId = req.user?.id;
    const applications = await prisma.loanApplication.findMany({
      where: { userId:userId },
      include: { user: true },
    });
    console.log("Total applications fetched:", applications);
    res.status(200).json({ applications });
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

export const getPendingVerificationApplications = async (req: AuthRequest, res: Response) => {
  try {
    // List applications that have not yet been verified
    const userId = req.user?.id;
    const applications = await prisma.loanApplication.findMany({
      where: { userId:userId, status: "PENDING" },
      include: { user: true },
    });
    console.log("Pending applications fetched:", applications);
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

export const getApprovedApplications = async (req: AuthRequest, res: Response) => {
    try {
        // List applications that have not yet been verified
        const userId = req.user?.id;
        const applications = await prisma.loanApplication.findMany({
        where: { userId:userId, status: "APPROVED" },
        include: { user: true },
        });
        console.log("Approved applications fetched:", applications);
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: "Error fetching applications", error });
    }
};