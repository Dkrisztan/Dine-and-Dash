/*
  Warnings:

  - You are about to drop the column `orderId` on the `Food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_orderId_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "_FoodToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToOrder_AB_unique" ON "_FoodToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToOrder_B_index" ON "_FoodToOrder"("B");

-- AddForeignKey
ALTER TABLE "_FoodToOrder" ADD CONSTRAINT "_FoodToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToOrder" ADD CONSTRAINT "_FoodToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
