import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import Image from 'next/image';
import { Button } from '../ui/button';
import QuantityDialog from './QuantityDialog';

interface CartItemProps {
  item: {
    productId: string;
    product: {
      name: string;
      image: string;
      price: number;
    };
    quantity: number;
  };
  customQuantity: number;
  handleQuantity: (type: string) => void;
  mutate: (args: { productId: string; customQuantity: number }) => void;
  deleteMutate: (productId: string) => void;
  resetQuantity: () => void;
}

const CartItem = (props: CartItemProps) => {
  const {
    item,
    customQuantity,
    handleQuantity,
    mutate,
    resetQuantity,
    deleteMutate,
  } = props;
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center justify-start gap-4">
          <Image
            src={item.product.image}
            width={100}
            height={100}
            priority
            className="object-cover"
            alt={item.product.name}
          />
          <div className="flex flex-col flex-wrap items-start gap-2 px-2">
            <div className="text-lg">{item.product.name}</div>
            <Button
              size="xs"
              variant="destructive"
              onClick={() => deleteMutate(item.productId)}
            >
              Remove
            </Button>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-start">{item.quantity}</div>
      </TableCell>
      <TableCell>{item.product.price.toLocaleString()}원</TableCell>
      <TableCell>
        <QuantityDialog
          item={item}
          customQuantity={customQuantity}
          handleQuantity={handleQuantity}
          mutate={mutate}
          resetQuantity={resetQuantity}
        />
      </TableCell>
      <TableCell>
        {(item.product.price * item.quantity).toLocaleString()}원
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
