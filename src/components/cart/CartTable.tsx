import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import type { CartItemType } from '@/module/type';
import { TbMoodEmpty } from 'react-icons/tb';
import { UseMutateFunction } from '@tanstack/react-query';
import CartItem from './CartItem';

const tableHead = ['PRODUCT', 'QUANTITY', 'PRICE', 'ORDER', 'SUBTOTAL'];

interface CartItemProps {
  cartItems: CartItemType[] | undefined;
  customQuantity: number;
  handleQuantity: (e: any) => void;
  updateMutate: UseMutateFunction<
    void,
    Error,
    {
      productId: string;
      customQuantity: number;
    },
    unknown
  >;
  resetQuantity: () => void;
  deleteMutate: (productId: string) => void;
}

const CartTable = (props: CartItemProps) => {
  const {
    cartItems,
    customQuantity,
    handleQuantity,
    updateMutate,
    resetQuantity,
    deleteMutate,
  } = props;
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          {tableHead.map((head) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems?.length === 0 ? (
          <TableCell colSpan={5} className="">
            <div className="flex flex-col items-center justify-center gap-2 py-32">
              <TbMoodEmpty size={50} />
              <div className="text-lg">Cart is Empty</div>
            </div>
          </TableCell>
        ) : (
          cartItems?.map((item: any, index: number) => (
            <CartItem
              key={index}
              item={item}
              customQuantity={customQuantity}
              handleQuantity={handleQuantity}
              mutate={updateMutate}
              resetQuantity={resetQuantity}
              deleteMutate={deleteMutate}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CartTable;
