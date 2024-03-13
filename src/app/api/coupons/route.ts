import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Not logged in', { status: 401 });
    }

    const user = await prisma?.user.findUnique({
      where: { email: session.user?.email as string },
      include: { userCoupons: true },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    const userCoupons = await prisma?.coupon.findMany({
      where: { userCoupons: { some: { userId: user.id } } },
    });

    return NextResponse.json(userCoupons, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Not logged in', { status: 401 });
    }

    const { couponCode } = await request.json();

    const coupon = await prisma?.coupon.findUnique({
      where: { code: couponCode },
    });

    if (!coupon) {
      return new Response('Coupon not found', { status: 404 });
    }

    const user = await prisma?.user.findUnique({
      where: { email: session.user?.email as string },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    const newUserCoupon = await prisma?.userCoupon.create({
      data: {
        userId: user.id,
        couponId: coupon.couponId,
      },
    });

    return NextResponse.json(newUserCoupon, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
