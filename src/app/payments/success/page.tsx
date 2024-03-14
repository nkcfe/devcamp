import SuccessPage from '@/components/pay/SuccessPage';
import axios from 'axios';

import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { applyPoint, clearCart, clearCoupon, updateOrder } from '@/utils/fetch';
import { Payment } from '@/module/type';

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

  const clearCartResponse = await clearCart(searchParams.orderId);
  const clearCouponResponse = await clearCoupon(searchParams.orderId);
  const applyPointResponse = await applyPoint(searchParams.orderId);
  const updateOrderStateResponse = await updateOrder(
    searchParams.orderId,
    payments.data.paymentKey,
    payments.data.receipt.url,
    payments.data.method,
  );

  return <SuccessPage payments={payments.data} />;
}
