import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, orderName, paymentPrice } = body;
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Not logged in', { status: 401 });
    }

    const userId = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      select: { id: true },
    });

    if (!userId) {
      return new Response('User not found', { status: 404 });
    }

    const order = await prisma.order.create({
      data: {
        userId: userId.id,
        orderId: orderId,
        orderName: orderName,
        amount: paymentPrice,
      },
    });

    const orderForm = await prisma.orderForm.create({
      data: {
        orderId: order.orderId,
        name: body.name,
        phone: body.phone,
        email: body.email,
        recipient: body.recipient,
        recipientPhone: body.recipientNumber,
        postcode: body.postcode,
        address: body.address,
        detailAddress: body.detailAddress,
        deliveryMemo: body.deliveryMemo,
        initialPrice: body.initialPrice,
        shippingCost: body.shippingPrice,
        applyCoupon: body.applyCoupon,
        pointDiscount: body.applyPoint,
        finalPrice: body.paymentPrice,
        productsId: body.cartItems.map((item: any) => item.productId),
        accuralPoint: body.accuralPoint,
      },
    });

    if (!order || !orderForm) {
      return NextResponse.json('data error', { status: 500 });
    }

    return NextResponse.json('success', { status: 200 });
  } catch (error) {
    return NextResponse.json('server error', { status: 500 });
  }
}

export async function GET(req: NextRequest) {}

// export async function Delete(req: NextRequest) {
//   const { orderId } = await req.json();

//   try {
//     const order = await prisma.order.delete({
//       where: { orderId: orderId },
//     });

//     return NextResponse.json('Order deleted successfully', { status: 200 });
//   } catch (error) {
//     return NextResponse.json('server error', { status: 500 });
//   }
// }
