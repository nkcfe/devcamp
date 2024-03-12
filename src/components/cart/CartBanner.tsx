import React from 'react';
import { Progress } from '../ui/progress';

interface CartBannerProps {
  progress: number;
}

const CartBanner = (props: CartBannerProps) => {
  const { progress } = props;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-5xl">SHOPPING CART</div>
      <div className="mt-12">
        Shop for 1,000,000₩ more to enjoy FREE Shipping
      </div>
      <Progress value={progress} className="mt-6" />
    </div>
  );
};

export default CartBanner;
