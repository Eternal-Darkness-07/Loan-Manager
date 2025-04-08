-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'VERIFIED', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "LoanApplication" ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';
