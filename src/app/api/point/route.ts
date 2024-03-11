import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const point = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      select: { point: true },
    });

    return NextResponse.json(point, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
