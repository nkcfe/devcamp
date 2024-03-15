import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Product } from '@prisma/client';
import Image from 'next/image';

interface Products {
  products: Product[];
}

const Products = (props: Products) => {
  const { products } = props;

  return (
    <Card className="rounded-none">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">결제 상품</CardTitle>
      </CardHeader>
      <hr className="m-2" />
      <CardContent className="flex flex-col gap-2">
        {products.map((product) => (
          <div key={product.productId} className="mt-0 flex gap-4 p-4 pt-2">
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
              className="object-cover"
            />
            <div className="flex flex-col">
              <div
                key={product.name}
                className="w-[500px] truncate font-semibold"
              >
                {product.name}
              </div>
              <div>{product.price.toLocaleString()}원</div>
            </div>
            <hr className="border " />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Products;
