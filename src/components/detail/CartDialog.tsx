import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface CartDialogProps {
  handleAddToCart: () => void;
}

const CartDialog = (props: CartDialogProps) => {
  const { handleAddToCart } = props;
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" onClick={handleAddToCart} className="w-full">
          장바구니
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex w-[320px] flex-col items-center justify-center">
        <AlertDialogTitle className="mb-10">
          장바구니에 상품이 추가되었습니다.
        </AlertDialogTitle>
        <AlertDialogAction className="w-full">계속 쇼핑</AlertDialogAction>
        <AlertDialogAction
          className="w-full"
          onClick={() => router.push('/cart')}
        >
          장바구니 바로가기
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CartDialog;
