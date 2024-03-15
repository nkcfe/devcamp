-- DropForeignKey
ALTER TABLE "OrderForm" DROP CONSTRAINT "OrderForm_orderId_fkey";

-- AddForeignKey
ALTER TABLE "OrderForm" ADD CONSTRAINT "OrderForm_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
