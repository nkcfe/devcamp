import React from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useCartStore } from '@/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CartDialog from './CartDialog';

interface DrawerPageProps {
  productId: string;
  quantity: number;
  addQuantity: () => void;
  subtractQuantity: () => void;
  handleOpen: () => void;
}

const DrawerPage = (props: DrawerPageProps) => {
  const { productId, quantity, addQuantity, subtractQuantity, handleOpen } =
    props;
  const { status } = useSession();
  const router = useRouter();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({ productId, quantity });
  };

  const handleBuyNow = () => {
    if (status === 'authenticated') {
      addToCart({ productId, quantity });
      router.push('/pay');
    }

    if (status === 'unauthenticated') {
      handleOpen();
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="mr-10">구매하기</Button>
      </DrawerTrigger>
      <DrawerContent className="mb-20">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>수량</DrawerTitle>
            <DrawerDescription>
              구매할 상품의 개수를 선택해주세요.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="size-8 shrink-0 rounded-full"
                onClick={subtractQuantity}
              >
                <MinusIcon className="size-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {quantity}개
                </div>
                <div className="mt-2 text-[0.70rem] uppercase text-muted-foreground">
                  상품 개수
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-8 shrink-0 rounded-full"
                onClick={addQuantity}
              >
                <PlusIcon className="size-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleBuyNow}>바로구매</Button>
            <CartDialog handleAddToCart={handleAddToCart} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerPage;
