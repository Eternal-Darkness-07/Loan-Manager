// src/controllers/verifier.controller.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getPendingVerificationApplications = async (req: AuthRequest, res: Response) => {
  try {
    // List applications that have not yet been verified
    const applications = await prisma.loanApplication.findMany({
      where: { status: 'PENDING' },
      include: { user: true },
    });
    console.log("Pending applications fetched:", applications);
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

export const verifyApplication = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const application = await prisma.loanApplication.update({
      where: { id },
      data: { status: 'VERIFIED' },
    });
    res.status(200).json({ message: "Application verified", application });
  } catch (error) {
    res.status(500).json({ message: "Error verifying application", error });
  }
};

export const rejectApplication = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const application = await prisma.loanApplication.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
    res.status(200).json({ message: "Application rejected", application });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting application", error });
  }
};
