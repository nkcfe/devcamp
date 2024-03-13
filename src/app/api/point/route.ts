import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      select: { Point: true },
    });

    return NextResponse.json(user?.Point?.amount, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    });

    const point = await prisma.point.create({
      data: {
        userId: user?.id as string,
        amount: 10000,
      },
    });

    return NextResponse.json(point, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
