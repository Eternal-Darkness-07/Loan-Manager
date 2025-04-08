/*
  Warnings:

  - You are about to drop the column `amount` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `address` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountNeeded` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentAddress` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentStatus` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenureInMonths` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "amount",
DROP COLUMN "duration",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "amountNeeded" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "employmentAddress" TEXT NOT NULL,
ADD COLUMN     "employmentStatus" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "tenureInMonths" INTEGER NOT NULL;
