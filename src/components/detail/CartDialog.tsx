import React, { Dispatch, SetStateAction } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useRouter } from 'next/navigation';

interface CartDialogProps {
  isCartAlertOpen: boolean;
  setIsCartAlertOpen: Dispatch<SetStateAction<boolean>>;
}

const CartDialog = (props: CartDialogProps) => {
  const { isCartAlertOpen, setIsCartAlertOpen } = props;
  const router = useRouter();
  return (
    <AlertDialog
      open={isCartAlertOpen}
      onOpenChange={(open) => setIsCartAlertOpen(open)}d
    >
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
