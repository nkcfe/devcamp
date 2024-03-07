'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useToast } from '@/components/ui/use-toast';
import { ProductType } from '@/module/type';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

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
    <div className="mt-52 flex flex-col items-center justify-start">
      <Image src={image} alt={name} width={600} height={600} />
      <div className="mt-6 text-xl font-semibold">{name}</div>
      <div>{price.toLocaleString()}원</div>
      <div className="fixed bottom-0 z-[99] flex h-20 w-screen items-center justify-end gap-3 border-t bg-background">
        <div>총 상품금액 ({quantity}개)</div>
        <div className="mr-4 text-2xl font-bold">
          {price.toLocaleString()}원
        </div>
        <Drawer>
          <DrawerTrigger>
            <Button className="mr-10">구매하기</Button>
          </DrawerTrigger>
          <DrawerContent className="mb-20">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>수량</DrawerTitle>
                <DrawerDescription>
                  구매할 상품의 개수를 선택해주세요.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
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
                    <div className="text-7xl font-bold tracking-tighter">
                      {quantity}개
                    </div>
                    <div className="mt-2 text-[0.70rem] uppercase text-muted-foreground">
                      상품 개수
                    </div>
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
              </div>
              <DrawerFooter>
                <Button>바로구매</Button>
                <DrawerClose asChild>
                  <Button variant="outline">장바구니</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default DetailPage;
