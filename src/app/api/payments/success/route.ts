import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

  const url = 'https://api.tosspayments.com/v1/payments/confirm';
  const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

  await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      amount,
      orderId,
      paymentKey,
    }),
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  redirect(`/payments/success?orderId=${orderId}`);
}
