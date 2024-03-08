'use client';

import { useToast } from '@/components/ui/use-toast';
import { ProductType } from '@/module/type';

import Image from 'next/image';
import React, { useState } from 'react';
import DrawerPage from './DrawerPage';
import TabPage from './TabPage';

const MAX_COUNT = 10;
const MIN_COUNT = 1;

const DetailPage = ({ id, name, price, image }: ProductType) => {
  const [quantity, setQuantity] = useState(MIN_COUNT);
  const { toast } = useToast();

  const addQuantity = () => {
    if (quantity >= MAX_COUNT)
      return toast({
        title: '최대 구매 개수는 10개입니다.',
        variant: 'destructive',
      });
    setQuantity((prev) => prev + 1);
  };

  const subtractQuantity = () => {
    if (quantity <= MIN_COUNT)
      return toast({
        title: '최소 구매 개수는 1개입니다.',
        variant: 'destructive',
      });

    setQuantity((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="mt-20 flex h-[800px] flex-col items-center justify-center">
        <Image src={image} alt={name} width={600} height={600} priority />
        <div className="mt-6 text-xl font-semibold">{name}</div>
        <div>{price.toLocaleString()}원</div>
      </div>

      <TabPage />

      <div className="fixed bottom-0 z-[99] flex h-20 w-screen items-center justify-end gap-3 border-t bg-background">
        <div>총 상품금액 ({quantity}개)</div>
        <div className="mr-4 text-2xl font-bold">
          {(price * quantity).toLocaleString()}원
        </div>
        <DrawerPage
          productId={id}
          quantity={quantity}
          addQuantity={addQuantity}
          subtractQuantity={subtractQuantity}
        />
      </div>
    </div>
  );
};

export default DetailPage;
