import React from 'react';

import Image from 'next/image';
import { MinusIcon, PlusIcon } from 'lucide-react';
import type { ProductType } from '@/module/type';
import { Button } from '../ui/button';

interface ProductSummaryProps {
  product: ProductType;
  quantity: number;
  addQuantity: () => void;
  subtractQuantity: () => void;
  handleAddToCart: () => void;
}

const ProductSummary = (props: ProductSummaryProps) => {
  const { name, price, description, category, image } = props.product;
  const { quantity, addQuantity, subtractQuantity, handleAddToCart } = props;
  return (
    <div className="mt-10 flex items-start justify-center gap-10">
      <Image
        src={image}
        alt={name}
        width={500}
        height={500}
        priority
        className="shrink-0"
      />
      <div className="flex flex-col items-start justify-between gap-4">
        <div className="mt-6 text-4xl ">{name}</div>
        <div className="text-2xl">₩{price.toLocaleString()}</div>
        <div className="w-96 text-sm">{description}</div>
        <div className="w-96 text-sm">
          <span className="font-semibold">Categories: </span>
          {category}
        </div>
        <div className="mt-4 flex w-36 items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-full"
            onClick={subtractQuantity}
          >
            <MinusIcon className="size-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="tracking-tighter">{quantity}개</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-full"
            onClick={addQuantity}
          >
            <PlusIcon className="size-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <Button onClick={handleAddToCart} className="w-36">
          장바구니
        </Button>
      </div>
    </div>
  );
};

export default ProductSummary;
