'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import CartFooter from './CartFooter';
import CartItem from './CartItem';
import Empty from './Empty';
import { Progress } from '../ui/progress';

const tableHead = ['PRODUCT', 'QUANTITY', 'PRICE', 'ORDER', 'SUBTOTAL'];

const CartPage = () => {
  const [customQuantity, setCustomQuantity] = useState(0);
  const [progress, setProgress] = useState(0);

  console.log(progress);

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axios.get('/api/cart');
      return response.data;
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
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
    },
  });

  useEffect(() => {
    if (cartItems) {
      const totalQuantity = cartItems.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0,
      );
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

  const totalPrice = cartItems.reduce(
    (acc: number, item: any) => acc + item.quantity * item.product.price,
    0,
  );

  const totalQuantity = cartItems.reduce(
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
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl">SHOPPING CART</div>
          <div className="mt-12">
            Shop for 1,000,000₩ more to enjoy FREE Shipping
          </div>
          <Progress value={progress} className="mt-6" />
        </div>

        <div className="mt-12 w-full">
          {cartItems.length === 0 ? (
            <Empty />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {tableHead.map((head) => (
                    <TableHead key={head}>{head}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item: any, index: number) => (
                  <CartItem
                    key={index}
                    item={item}
                    customQuantity={customQuantity}
                    handleQuantity={handleQuantity}
                    mutate={mutate}
                    resetQuantity={resetQuantity}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <CartFooter totalQuantity={totalQuantity} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default CartPage;
