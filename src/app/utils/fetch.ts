import { cache } from 'react';

import prisma from '@/db';
import { getSession } from 'next-auth/react';
import { authOptions } from './authOptions';
import { getServerSession } from 'next-auth';

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
      (acc, item) => acc + item.product.price,
      0,
    );

    return { cartItems, totalPrice };
  } catch (error) {
    console.error(error);
    return { cartItems: [], totalPrice: 0 };
  }
};
