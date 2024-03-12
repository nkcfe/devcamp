import prisma from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await prisma.product.findMany({
    select: {
      category: true,
    },
  });

  if (!response) {
    return NextResponse.json({ message: '상품이 없습니다.' }, { status: 404 });
  }

  const setCategories = new Set(response.map((item) => item.category));

  return NextResponse.json(Array.from(setCategories), { status: 200 });
}
