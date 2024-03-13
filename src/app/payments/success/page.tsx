import SuccessPage from '@/components/pay/SuccessPage';
import axios from 'axios';

import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: '카드' | '가상계좌' | '계좌이체';
  paymentKey: string;
  orderId: string;
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY || '';
  const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString('base64');

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const payments = await axios.get<Payment>(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
  });

  try {
    const orderState = await prisma.order.findUnique({
      where: { orderId: searchParams.orderId },
      select: { state: true },
    });

    if (orderState?.state === '대기중') {
      // 장바구니 비우기
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      const user = await prisma.user.findUnique({
        where: { email: email as string },
        select: { id: true, Point: true },
      });
      const cart = await prisma.cart.findFirst({
        where: { userId: user?.id },
      });
      await prisma.cartItem.deleteMany({
        where: { cartId: cart?.cartId },
      });

      const orderForm = await prisma.orderForm.findFirst({
        where: { orderId: searchParams.orderId },
      });

      // 쿠폰 사용 내역 삭제
      const coupon = JSON.parse(orderForm?.applyCoupon ?? '');

      if (coupon) {
        await prisma.userCoupon.delete({
          where: {
            userId_couponId: {
              userId: user?.id as string,
              couponId: coupon.couponId,
            },
          },
        });
      }
      // 포인트 삭제 및 적립
      const point = await prisma.point.findFirst({
        where: { pointId: user?.Point?.pointId },
        select: { amount: true },
      });

      await prisma.point.update({
        where: { pointId: user?.Point?.pointId },
        data: {
          amount:
            (point?.amount as number) -
            (orderForm?.pointDiscount as number) +
            (orderForm?.accuralPoint as number),
        },
      });

      // 주문 상태 업데이트
      await prisma.order.update({
        where: { orderId: searchParams.orderId },
        data: {
          state: 'SUCCESS',
          paymentKey: payments.data.paymentKey,
          receiptUrl: payments.data.receipt.url,
          method: payments.data.method,
        },
      });
    }
  } catch (error) {
    console.error('Error updating order state:', error);
  }

  return <SuccessPage payments={payments.data} />;
}
