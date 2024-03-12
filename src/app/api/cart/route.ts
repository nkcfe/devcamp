import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import prisma from '@/db';

export async function GET(request: Request) {
  try {
    // 세션 확인
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json([], { status: 200 });
    }

    // 유저의 카트 정보 가져오기
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      select: { cartId: true },
    });
    if (!user || !user.cartId) {
      return NextResponse.json([], { status: 200 });
    }

    const cart = await prisma.cart.findUnique({
      where: { cartId: user.cartId },
      include: { cartItems: { include: { product: true } } },
    });

    const sortedCart = cart?.cartItems.sort(
      (a, b) => a.createdAt.getDate() - b.createdAt.getDate(),
    );

    // 응답 전송
    return new Response(JSON.stringify(sortedCart), { status: 200 });
  } catch (error) {
    console.error('Error fetching user cart:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 세션 확인
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Not logged in', { status: 401 });
    }

    // 제품 및 수량 추출
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return new Response('Missing productId or quantity', { status: 400 });
    }

    // 유저의 장바구니 확인
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      select: { cartId: true, id: true },
    });

    if (!user?.cartId) {
      const newCart = await prisma.cart.create({
        data: {
          userId: user?.id as string,
          cartItems: {
            create: {
              productId: productId,
              quantity: quantity,
            },
          },
        },
      });

      await prisma.user.update({
        where: { id: user?.id },
        data: { cartId: newCart.cartId },
      });

      return NextResponse.json(newCart, { status: 200 });
    } else {
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: user.cartId,
          productId,
        },
      });

      if (cartItem) {
        const updatedCartItem = await prisma.cartItem.update({
          where: { cartItemId: cartItem.cartItemId },
          data: { quantity: cartItem.quantity + parseInt(quantity) },
        });

        return new Response(JSON.stringify(updatedCartItem), { status: 200 });
      } else {
        const newCartItem = await prisma.cartItem.create({
          data: {
            cartId: user.cartId,
            productId,
            quantity: parseInt(quantity),
          },
        });

        return NextResponse.json(newCartItem, { status: 200 });
      }
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { productId, customQuantity } = body;

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Not logged in', { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: { cartId: true },
  });

  if (!user || !user.cartId) {
    return new Response('User cart not found', { status: 404 });
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: user.cartId,
      productId,
    },
  });

  try {
    if (cartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { cartItemId: cartItem.cartItemId },
        data: { quantity: { increment: customQuantity } },
      });

      return new Response(JSON.stringify(updatedCartItem), { status: 200 });
    } else {
      return new Response('Cart item not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { productId } = await request.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Not logged in', { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: { cartId: true },
  });

  if (!user || !user.cartId) {
    return new Response('User cart not found', { status: 404 });
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: user.cartId,
      productId,
    },
  });

  try {
    if (cartItem) {
      await prisma.cartItem.delete({
        where: { cartItemId: cartItem.cartItemId },
      });

      return new Response('Cart item deleted', { status: 200 });
    } else {
      return new Response('Cart item not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
