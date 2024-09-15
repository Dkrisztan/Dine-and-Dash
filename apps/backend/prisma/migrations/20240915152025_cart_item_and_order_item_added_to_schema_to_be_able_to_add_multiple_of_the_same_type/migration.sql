/*
  Warnings:

  - You are about to drop the `_CartToFood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FoodToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToFood" DROP CONSTRAINT "_CartToFood_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToFood" DROP CONSTRAINT "_CartToFood_B_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToOrder" DROP CONSTRAINT "_FoodToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToOrder" DROP CONSTRAINT "_FoodToOrder_B_fkey";

-- DropTable
DROP TABLE "_CartToFood";

-- DropTable
DROP TABLE "_FoodToOrder";

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
