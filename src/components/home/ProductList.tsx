import { ProductType } from '@/module/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ProductList {
  products: ProductType[] | null;
}

const ProductList = (props: ProductList) => {
  const { products } = props;
  const router = useRouter();

  return products?.map(({ productId, name, image, price }) => (
    <article
      key={name}
      className="group flex size-full cursor-pointer flex-col"
      onClick={() => {
        router.push(`/product/${productId}`);
      }}
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
