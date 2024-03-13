import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/db';

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  await prisma.order.update({
    where: { orderId: orderId as string },
    data: { state: 'FAIL' },
  });

  redirect(`/payments/fail`);
}
