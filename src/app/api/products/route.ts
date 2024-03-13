import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as string;

    if (category === 'ALL PRODUCTS' || !category) {
      const response = await prisma.product.findMany({
        select: {
          productId: true,
          name: true,
          price: true,
          image: true,
          description: true,
          category: true,
          detail: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (!response) {
        return NextResponse.json(
          { message: '상품이 없습니다.' },
          { status: 404 },
        );
      }

      return NextResponse.json(response, { status: 200 });
    } else {
      const response = await prisma.product.findMany({
        where: {
          category,
        },
        select: {
          productId: true,
          name: true,
          price: true,
          image: true,
          description: true,
          category: true,
          detail: true,
        },
      });
      if (!response) {
        return NextResponse.json(
          { message: '상품이 없습니다.' },
          { status: 404 },
        );
      }

      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: '서버에서 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
