/*
  Warnings:

  - You are about to drop the column `cartId` on the `Food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_cartId_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "cartId";

-- CreateTable
CREATE TABLE "_CartToFood" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToFood_AB_unique" ON "_CartToFood"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToFood_B_index" ON "_CartToFood"("B");

-- AddForeignKey
ALTER TABLE "_CartToFood" ADD CONSTRAINT "_CartToFood_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToFood" ADD CONSTRAINT "_CartToFood_B_fkey" FOREIGN KEY ("B") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
