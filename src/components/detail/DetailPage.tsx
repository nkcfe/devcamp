'use client';

import { useToast } from '@/components/ui/use-toast';
import { ProductType } from '@/module/type';

import Image from 'next/image';
import React, { useState } from 'react';
import DrawerPage from './DrawerPage';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import AuthPage from '../auth/AuthPage';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { MinusIcon, PlusIcon } from 'lucide-react';

const MAX_COUNT = 10;
const MIN_COUNT = 1;

const DetailPage = ({
  productId,
  name,
  price,
  image,
  description,
  detail,
  category,
}: ProductType) => {
  const [quantity, setQuantity] = useState(MIN_COUNT);
  const [open, setOpen] = useState(false);
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

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="mt-28 flex items-center justify-center">
      <div className="w-full lg:max-w-6xl">
        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
            <Button
              // onClick={handleAddToCart}
              className="w-36"
            >
              장바구니
            </Button>
          </div>
        </div>

        <hr className="my-10" />

        <div className="fixed bottom-0 z-[99] flex h-20 w-screen items-center justify-end gap-3 border-t bg-background">
          <div>총 상품금액 ({quantity}개)</div>
          <div className="mr-4 text-2xl font-bold">
            {(price * quantity).toLocaleString()}원
          </div>
          <DrawerPage
            productId={productId}
            quantity={quantity}
            addQuantity={addQuantity}
            subtractQuantity={subtractQuantity}
            handleOpen={handleOpen}
          />
        </div>

        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <DialogContent className="mx-0 flex w-auto items-center justify-center">
            <AuthPage />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DetailPage;
