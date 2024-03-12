import { cache } from 'react';

import prisma from '@/db';

export const getProducts = cache(async () => {
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
});

export const getProduct = cache(async (id: string) => {
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
});

export const getCategories = cache(async () => {
  const categories = await prisma.product.findMany({
    select: {
      category: true,
    },
  });

  if (!categories) return [];

  const setCategories = new Set(categories.map((item) => item.category));

  return Array.from(setCategories);
});