'use client';

import React, { useState } from 'react';

import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import CartFooter from './CartFooter';
import CartItem from './CartItem';
import Empty from './Empty';

const tableHead = ['제품', '수량', '가격', '주문 관리', '합계'];

const CartPage = () => {
  const [customQuantity, setCustomQuantity] = useState(0);
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
  if (isLoading) return <div>Loading...</div>;

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
    <div className="container mt-28 flex flex-col items-center justify-start">
      <div className="flex w-96 flex-col items-center justify-center">
        <div className="text-4xl font-bold">장바구니</div>
        {/* <div className="mt-12">Shop for $34 more to enjoy FREE Shipping</div>
        <Progress value={50} className="mt-6" /> */}
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
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell>총 상품금액</TableCell>
                <TableCell>{totalPrice.toLocaleString()}원</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell>배송비</TableCell>
                <TableCell>무료</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell>총 결제금액</TableCell>
                <TableCell>{totalPrice.toLocaleString()}원</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>

      <CartFooter totalQuantity={totalQuantity} totalPrice={totalPrice} />
    </div>
  );
};

export default CartPage;
