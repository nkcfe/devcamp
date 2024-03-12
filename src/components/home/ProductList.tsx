import { ProductType } from '@/module/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BounceLoader } from 'react-spinners';

interface ProductList {
  productItems: ProductType[] | null;
  isProductLoading: boolean;
}

const ProductList = (props: ProductList) => {
  const { productItems, isProductLoading } = props;
  const router = useRouter();

  return (
    <>
      {isProductLoading ? (
        <div className="flex min-h-[400px] w-full items-center justify-center">
          <BounceLoader color="#000" size={50} />
        </div>
      ) : (
        <div className="mb-40 grid auto-cols-fr grid-cols-1  items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {productItems?.map(({ productId, name, image, price }) => (
            <article
              key={name}
              className="group flex size-full cursor-pointer flex-col"
              onClick={() => {
                router.push(`/product/${productId}`);
              }}
            >
              <div className="relative size-[360px] overflow-hidden">
                <Image
                  src={image}
                  className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                  fill
                  sizes="100% 100%"
                  priority
                  alt={name}
                />
              </div>
              <div className="mt-6 flex w-full items-start justify-between gap-1 text-gray-600">
                <div className="text-xs">{name}</div>
                <div className="w-20 text-right text-xs font-semibold">
                  {price.toLocaleString()}원
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
