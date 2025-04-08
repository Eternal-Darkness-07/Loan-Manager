import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const applyLoan = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id; // assuming middleware adds user to req
  const {
    fullName,
    address,
    tenureMonths,
    reason,
    amount,
    employmentStatus,
    employmentAddress,
    acceptedTerms,
  } = req.body;

  if (!acceptedTerms) {
    res.status(400).json({ message: 'You must accept the terms and conditions' });
    return;
  }

  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return; 
  }

  try {
    const loanApplication = await prisma.loanApplication.create({
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
  } catch (error) {
    console.error('Loan apply error:', error);
    res.status(500).json({ message: 'Something went wrong' });
    return; 
  }
};
