-- AlterTable
ALTER TABLE "OrderForm" ALTER COLUMN "shippingCost" DROP NOT NULL,
ALTER COLUMN "pointDiscount" DROP NOT NULL,
ALTER COLUMN "applyCoupon" DROP NOT NULL;
