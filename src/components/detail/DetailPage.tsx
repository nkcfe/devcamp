'use client';

import { useToast } from '@/components/ui/use-toast';
import type { ProductType } from '@/module/type';

import React, { useState } from 'react';
import DrawerPage from './DrawerPage';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import AuthPage from '../auth/AuthPage';

import BreadCrumbPage from './BreadCrumbPage';
import ProductSummary from './ProductSummary';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import DetailAccordion from './DetailAccordion';
import DetailFooter from './DetailFooter';
import CartDialog from './CartDialog';
import { useCartCounts } from '@/store/useCartCounts';

const MAX_COUNT = 10;
const MIN_COUNT = 1;

interface DetailPageProps {
  product: ProductType;
}

const DetailPage = (props: DetailPageProps) => {
  const { name, detail, price, productId } = props.product;

  const { toast } = useToast();
  const { status } = useSession();
  const { incrementCartCounts } = useCartCounts();

  const [quantity, setQuantity] = useState(MIN_COUNT);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartAlertOpen, setIsCartAlertOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const handleAddToCart = async () => {
    if (status === 'authenticated') {
      const result = await axios.post('/api/cart', {
        productId,
        quantity,
      });
      if (result.status === 200) {
        incrementCartCounts();
        setIsCartAlertOpen(true);
      }
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      <div className="mt-28 flex items-center justify-center">
        <div className="w-full lg:max-w-6xl">
          <BreadCrumbPage name={name} />
          <ProductSummary
            product={props.product}
            quantity={quantity}
            addQuantity={addQuantity}
            subtractQuantity={subtractQuantity}
            handleAddToCart={handleAddToCart}
          />
          <hr className="my-10" />
          <DetailAccordion detail={detail} />
        </div>
        <DetailFooter
          quantity={quantity}
          price={price}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <DrawerPage
          productId={productId}
          quantity={quantity}
          addQuantity={addQuantity}
          subtractQuantity={subtractQuantity}
          handleAddToCart={handleAddToCart}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </div>
      <Dialog open={isAuthOpen} onOpenChange={(open) => setIsAuthOpen(open)}>
        <DialogContent className="mx-0 flex w-auto items-center justify-center">
          <AuthPage />
        </DialogContent>
      </Dialog>
      <CartDialog
        isCartAlertOpen={isCartAlertOpen}
        setIsCartAlertOpen={setIsCartAlertOpen}
      />
    </>
  );
};

export default DetailPage;
