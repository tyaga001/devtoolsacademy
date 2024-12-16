/*
  Warnings:

  - Added the required column `headline` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "features" TEXT[],
ADD COLUMN     "headline" TEXT NOT NULL;
