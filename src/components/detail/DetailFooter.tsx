import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

interface DetailFooterProps {
  quantity: number;
  price: number;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const DetailFooter = (props: DetailFooterProps) => {
  const { quantity, price, setIsDrawerOpen } = props;
  return (
    <div className="fixed bottom-0 z-[20] flex h-20 w-screen items-center justify-end gap-3 border-t bg-background">
      <div>총 상품금액 ({quantity}개)</div>
      <div className="mr-4 text-2xl font-bold">
        {(price * quantity).toLocaleString()}원
      </div>
      <Button
        className="mr-10"
        onClick={() => setIsDrawerOpen((prev) => !prev)}
      >
        추가하기
      </Button>
    </div>
  );
};

export default DetailFooter;
