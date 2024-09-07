/*
  Warnings:

  - You are about to alter the column `rating` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION[];
