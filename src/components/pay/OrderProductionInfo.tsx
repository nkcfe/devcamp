import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { CartItemType } from '@/module/type';

interface OrderProductionInfoProps {
  cartItems: CartItemType[] | undefined;
}

const OrderProductionInfo = (props: OrderProductionInfoProps) => {
  const { cartItems } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>주문 상품 정보</CardTitle>
      </CardHeader>
      {cartItems?.map((item: any) => {
        return (
          <CardContent key={item.id} className="mt-2 p-6 pt-0">
            <div className="flex">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={100}
                height={100}
                priority
                className="rounded-md"
              />
              <div className="ml-4 flex flex-col items-start justify-center gap-1">
                <div className="font-semibold">{item.product.name}</div>
                <div className="text-sm text-gray-600">
                  <span>수량 : </span>
                  {item.quantity}개
                </div>
                <div className="text-sm font-bold">
                  {(item.product.price * item.quantity).toLocaleString()}원
                </div>
              </div>
            </div>
          </CardContent>
        );
      })}
    </Card>
  );
};

export default OrderProductionInfo;
