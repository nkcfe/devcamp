import { ProductType } from '@/module/type';
import Image from 'next/image';
import React from 'react';

interface ProductList {
  products: ProductType[] | null;
}

const ProductList = (props: ProductList) => {
  const { products } = props;

  return products?.map(({ id, name, image, price }) => (
    <article
      key={name}
      className="group flex size-full cursor-pointer flex-col"
    >
      <div className="relative size-96 overflow-hidden">
        <Image
          src={image}
          className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
          fill
          alt={name}
        />
      </div>
      <div className="mt-1 flex flex-col items-center justify-center gap-1 text-gray-600">
        <div>{name}</div>
        <div>{price.toLocaleString()}원</div>
      </div>
    </article>
  ));
};

export default ProductList;
