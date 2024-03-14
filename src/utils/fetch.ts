import { cache } from 'react';

import prisma from '@/db';
import { authOptions } from './authOptions';
import { getServerSession } from 'next-auth';
import { OrderForm } from '@prisma/client';
import { Payment } from '@/module/type';

export const getProducts = cache(async () => {
  try {
    const products = await prisma.product.findMany({
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

    if (!products) return [];

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const getProduct = cache(async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        productId: id,
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

    if (!product) return null;

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const getCategories = cache(async () => {
  try {
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
    });

    if (!categories) return [];

    const setCategories = new Set(categories.map((item) => item.category));

    return Array.from(setCategories);
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const getCartItems = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { cartItems: [], totalPrice: 0 };

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      select: { cartId: true },
    });

    const cartId = user?.cartId;
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cartId as string },
      include: {
        product: true,
      },
    });

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    return { cartItems, totalPrice };
  } catch (error) {
    console.error(error);
    return { cartItems: [], totalPrice: 0 };
  }
};

export const getOrderItems = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return;

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      include: { Order: { include: { OrderForm: true } } },
    });

    return user?.Order;
  } catch (error) {
    return null;
  }
};

export const clearCart = async (orderId: string) => {
  try {
    const orderState = await prisma.order.findUnique({
      where: { orderId: orderId },
      select: { state: true },
    });
    if (orderState?.state !== '대기중') return;
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: email as string },
      select: { id: true, Point: true },
    });
    const cart = await prisma.cart.findFirst({
      where: { userId: user?.id },
    });
    await prisma.cartItem.deleteMany({
      where: { cartId: cart?.cartId },
    });
    return JSON.stringify({ message: 'success' });
  } catch (error) {
    return JSON.stringify({ message: 'fail' });
  }
};

export const clearCoupon = async (orderId: string) => {
  try {
    const orderState = await prisma.order.findUnique({
      where: { orderId: orderId },
      select: { state: true },
    });
    if (orderState?.state !== '대기중') return;
    const orderForm = await prisma.orderForm.findFirst({
      where: { orderId: orderId },
      select: { applyCoupon: true },
    });
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: email as string },
      select: { id: true, Point: true },
    });
    const coupon = orderForm?.applyCoupon;
    if (coupon !== '') {
      await prisma.userCoupon.delete({
        where: {
          userId_couponId: {
            userId: user?.id as string,
            couponId: JSON.parse(coupon ?? ''),
          },
        },
      });
    }
    return JSON.stringify({ message: 'success' });
  } catch (error) {
    return JSON.stringify({ message: 'fail' });
  }
};

export const applyPoint = async (orderId: string) => {
  try {
    const orderState = await prisma.order.findUnique({
      where: { orderId: orderId },
      select: { state: true },
    });
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: email as string },
      select: { id: true, Point: true },
    });
    if (orderState?.state !== '대기중') return;
    const point = await prisma.point.findFirst({
      where: { pointId: user?.Point?.pointId },
      select: { amount: true },
    });
    const orderForm = await prisma.orderForm.findFirst({
      where: { orderId: orderId },
    });

    await prisma.point.update({
      where: { pointId: user?.Point?.pointId },
      data: {
        amount:
          (point?.amount as number) -
          (orderForm?.pointDiscount as number) +
          (orderForm?.accuralPoint as number),
      },
    });
    return JSON.stringify({ message: 'success' });
  } catch (error) {
    return JSON.stringify({ message: 'fail' });
  }
};

export const updateOrder = async (
  orderId: string,
  paymentKey: string,
  receiptUrl: string,
  method: string,
) => {
  try {
    const orderState = await prisma.order.findUnique({
      where: { orderId: orderId },
      select: { state: true },
    });
    console.log(paymentKey, receiptUrl, method, orderState?.state);
    if (orderState?.state !== '대기중') return;
    await prisma.order.update({
      where: { orderId: orderId },
      data: {
        state: 'SUCCESS',
        paymentKey: paymentKey,
        receiptUrl: receiptUrl,
        method: method,
      },
    });
    return JSON.stringify({ message: 'success' });
  } catch (error) {
    return JSON.stringify({ message: 'fail' });
  }
};
