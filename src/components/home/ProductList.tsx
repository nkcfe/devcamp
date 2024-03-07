import Image from 'next/image';
import React from 'react';

interface ProductList {
  productItems: {
    id: number;
    name: string;
    imgSrc: string;
    price: number;
  }[];
}

const ProductList = (props: ProductList) => {
  const { productItems } = props;

  return productItems.map(({ id, name, imgSrc, price }) => (
    <article
      key={name}
      className="group flex size-full cursor-pointer flex-col"
    >
      <div className="relative size-96 overflow-hidden">
        <Image
          src={imgSrc}
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
