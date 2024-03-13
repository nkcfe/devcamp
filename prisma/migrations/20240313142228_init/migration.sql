-- CreateTable
CREATE TABLE "Order" (
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentKey" TEXT,
    "orderName" TEXT NOT NULL,
    "receiptUrl" TEXT,
    "method" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '대기중',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "OrderForm" (
    "orderFormId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "recipientPhone" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "detailAddress" TEXT NOT NULL,
    "deliveryMemo" TEXT NOT NULL,
    "initialPrice" DOUBLE PRECISION NOT NULL,
    "shippingCost" DOUBLE PRECISION NOT NULL,
    "couponDiscount" DOUBLE PRECISION NOT NULL,
    "pointDiscount" DOUBLE PRECISION NOT NULL,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "productsId" TEXT[],
    "accuralPoint" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderForm_pkey" PRIMARY KEY ("orderFormId")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderForm" ADD CONSTRAINT "OrderForm_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
