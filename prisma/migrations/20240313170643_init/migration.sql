/*
  Warnings:

  - You are about to drop the column `couponDiscount` on the `OrderForm` table. All the data in the column will be lost.
  - Added the required column `applyCoupon` to the `OrderForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderForm" DROP COLUMN "couponDiscount",
ADD COLUMN     "applyCoupon" TEXT NOT NULL;
