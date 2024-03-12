import React from 'react';

interface CartTotalProps {
  totalPrice: number | undefined;
  currentShpping: number;
}

const CartTotal = (props: CartTotalProps) => {
  const { totalPrice, currentShpping } = props;

  return (
    <div className="flex w-96 flex-col justify-between border p-2">
      <div className="flex items-center justify-between">
        <div className="p-1 text-xl">Subtotal</div>
        <div className="font-semibold">{totalPrice?.toLocaleString()} ₩</div>
      </div>
      <div className="flex items-center justify-between border-y">
        <div className="p-1 text-xl">Shipping</div>
        <div className="font-semibold">+{currentShpping} ₩</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="p-1 text-2xl">Total</div>
        <div className="font-semibold">
          {totalPrice &&
            (totalPrice - currentShpping < 0
              ? 0
              : totalPrice + currentShpping
            ).toLocaleString()}
          ₩
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
