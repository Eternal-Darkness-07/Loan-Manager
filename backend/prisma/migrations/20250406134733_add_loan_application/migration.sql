/*
  Warnings:

  - You are about to drop the column `amountNeeded` on the `LoanApplication` table. All the data in the column will be lost.
  - You are about to drop the column `loanTenure` on the `LoanApplication` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `LoanApplication` table. All the data in the column will be lost.
  - Added the required column `acceptedTerms` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenureMonths` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoanApplication" DROP COLUMN "amountNeeded",
DROP COLUMN "loanTenure",
DROP COLUMN "status",
ADD COLUMN     "acceptedTerms" BOOLEAN NOT NULL,
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tenureMonths" INTEGER NOT NULL;
