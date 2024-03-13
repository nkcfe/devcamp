import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(null, { status: 200 });
    }

    // 유저의 카트 정보 가져오기
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      select: { cartId: true },
    });
    if (!user || !user.cartId) {
      return NextResponse.json(0, { status: 200 });
    }

    const cartItemCounts = await prisma.cartItem.count({
      where: { cartId: user.cartId },
    });

    return NextResponse.json(cartItemCounts, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
