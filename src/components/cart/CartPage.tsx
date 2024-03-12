'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';

import CartFooter from './CartFooter';
import CartBanner from './CartBanner';
import CartTable from './CartTable';

import { CartItemType } from '@/module/type';
import CartTotal from './CartTotal';

const CartPage = () => {
  const [customQuantity, setCustomQuantity] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentShpping] = useState(progress === 100 ? 0 : 2500);
  const { toast } = useToast();

  const { data: cartItems, isLoading } = useQuery<any, unknown, CartItemType[]>(
    {
      queryKey: ['cart'],
      queryFn: async () => {
        const response = await axios.get('/api/cart');
        return response.data;
      },
    },
  );

  const queryClient = useQueryClient();

  const { mutate: updateMutate } = useMutation({
    mutationFn: async ({
      productId,
      customQuantity,
    }: {
      productId: string;
      customQuantity: number;
    }) => {
      await axios.put('/api/cart', { productId, customQuantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      setCustomQuantity(0);
      toast({
        title: '수량이 변경되었습니다.',
        description: '카트가 업데이트 되었습니다.',
      });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (productId: string) => {
      await axios.delete('/api/cart', { data: { productId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: '상품이 삭제되었습니다.',
        description: '카트가 업데이트 되었습니다',
      });
    },
  });

  useEffect(() => {
    if (cartItems) {
      const totalPrice = cartItems.reduce(
        (acc: number, item: any) => acc + item.quantity * item.product.price,
        0,
      );
      const currentProgress = (totalPrice / 1000000) * 100;
      setProgress(currentProgress > 100 ? 100 : currentProgress);
    }
  }, [cartItems]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalPrice = cartItems?.reduce(
    (acc: number, item: any) => acc + item.quantity * item.product.price,
    0,
  );

  const totalQuantity = cartItems?.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );

  const resetQuantity = () => {
    setCustomQuantity(0);
  };

  const handleQuantity = (type: string) => {
    if (type === 'add') {
      setCustomQuantity((prev) => prev + 1);
    } else {
      setCustomQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="mt-40 flex flex-col items-center justify-start lg:max-w-6xl">
        <CartBanner progress={progress} />

        <div className="mt-12 min-w-[72rem]">
          <div className="flex flex-col">
            <div className="mb-4 p-2 text-3xl">CART LIST</div>
            <CartTable
              cartItems={cartItems}
              customQuantity={customQuantity}
              handleQuantity={handleQuantity}
              updateMutate={updateMutate}
              resetQuantity={resetQuantity}
              deleteMutate={deleteMutate}
            />

            <div className="mb-4 mt-20 p-2 text-3xl">CART TOTALS</div>
            <CartTotal
              totalPrice={totalPrice}
              currentShpping={currentShpping}
            />
          </div>
        </div>

        <CartFooter totalQuantity={totalQuantity} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default CartPage;
