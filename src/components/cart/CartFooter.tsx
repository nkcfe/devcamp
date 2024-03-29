import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface CartFooterProps {
  totalQuantity: number | undefined;
  totalPrice: number | undefined;
}

const CartFooter = (props: CartFooterProps) => {
  const { totalQuantity, totalPrice } = props;
  const router = useRouter();

  return (
    <div className="fixed bottom-0 z-[99] flex h-20 w-screen items-center justify-end gap-3 border-t bg-background pr-6">
      <div>총 상품금액 ({totalQuantity?.toLocaleString()}개)</div>
      <div className="mr-4 text-2xl font-bold">
        {totalPrice?.toLocaleString()}원
      </div>
      <Button onClick={() => router.push('/pay')}>주문하기</Button>
    </div>
  );
};

export default CartFooter;
