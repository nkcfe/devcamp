import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Product } from '@prisma/client';
import Image from 'next/image';

interface Products {
  products: Product[];
}

const Products = (props: Products) => {
  const { products } = props;

  return products.map((product) => (
    <Card key={product.productId}>
      <CardContent className="flex gap-4 p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="object-cover"
        />
        <div className="flex flex-col">
          <div key={product.name} className="w-[500px] truncate font-semibold">
            {product.name}
          </div>
          <div>{product.price.toLocaleString()}원</div>
        </div>
      </CardContent>
    </Card>
  ));
};

export default Products;
