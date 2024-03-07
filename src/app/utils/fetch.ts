import { cache } from 'react';

import prisma from '@/db';

export const getProducts = cache(async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });

  if (!products) return null;

  return products;
});
