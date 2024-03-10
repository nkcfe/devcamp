/*
  Warnings:

  - You are about to drop the column `userId` on the `Coupon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_userId_fkey";

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserCoupon" (
    "userId" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,

    CONSTRAINT "UserCoupon_pkey" PRIMARY KEY ("userId","couponId")
);

-- AddForeignKey
ALTER TABLE "UserCoupon" ADD CONSTRAINT "UserCoupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCoupon" ADD CONSTRAINT "UserCoupon_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("couponId") ON DELETE RESTRICT ON UPDATE CASCADE;
