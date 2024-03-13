import SuccessPage from '@/components/pay/SuccessPage';
import axios from 'axios';

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

  return <SuccessPage payments={payments.data} />;
}
