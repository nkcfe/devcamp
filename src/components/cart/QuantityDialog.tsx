import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface QuantityDialogProps {
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
  resetQuantity: () => void;
}

const QuantityDialog = (props: QuantityDialogProps) => {
  const { item, customQuantity, handleQuantity, mutate, resetQuantity } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        setIsDialogOpen(!isDialogOpen);
        resetQuantity();
      }}
    >
      <DialogTrigger>
        <Button variant="link" size="xs" className="text-blue-600">
          옵션 수정
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>수량 변경</DialogTitle>
          <DialogDescription>
            <div className="mt-6 flex size-6 w-full items-center justify-center">
              <div
                className="flex size-10 cursor-pointer items-center justify-center rounded-l-md border border-r-0 hover:bg-secondary"
                onClick={() => handleQuantity('subtract')}
              >
                <Minus />
              </div>
              <div className="flex size-10 items-center justify-center border-y">
                {item.quantity + customQuantity}
              </div>
              <div
                className="flex size-10 cursor-pointer items-center justify-center rounded-r-md border border-l-0 hover:bg-secondary"
                onClick={() => handleQuantity('add')}
              >
                <Plus />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary" onClick={resetQuantity}>
              취소
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              mutate({
                productId: item.productId,
                customQuantity: customQuantity,
              });
              setIsDialogOpen(false);
            }}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuantityDialog;
