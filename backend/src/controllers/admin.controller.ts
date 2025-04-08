// src/controllers/admin.controller.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getPendingApplications = async (req: AuthRequest, res: Response) => {
  try {
    // List applications that have been verified (ready for admin decision)
    const applications = await prisma.loanApplication.findMany({
      where: { status: 'VERIFIED' },
      include: { user: true },
    });
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

export const approveApplication = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const application = await prisma.loanApplication.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    res.status(200).json({ message: "Application approved", application });
  } catch (error) {
    res.status(500).json({ message: "Error approving application", error });
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

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: { in: ['ADMIN', 'VERIFIER'] } },
    });
    res.status(200).json({ users });
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Admin management: add an admin by updating a user's role.
export const addAdmin = async (req: AuthRequest, res: Response) => {
  const { name, email, password, role} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    res.status(200).json({ message: "User updated to admin", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user to admin", error });
  }
};

// Delete an admin user.
export const deleteAdmin = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "Admin deleted", user });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error });
  }
};
