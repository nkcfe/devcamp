import { Order, OrderForm, Product } from '@prisma/client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { format } from 'date-fns';
import { Button } from '../../ui/button';
import Summary from './Summary';
import Image from 'next/image';
import Products from './Products';
import DeliveryInfo from './DeliveryInfo';

interface OrderDetailPageProps {
  order: {
    orderId: string;
    userId: string;
    paymentKey: string | null;
    orderName: string;
    receiptUrl: string | null;
    method: string | null;
    amount: number;
    createdAt: Date;
    state: string;
    OrderForm: OrderForm[];
    products: Product[];
  }[];
}

const OrderDetailPage = (props: OrderDetailPageProps) => {
  const { order } = props;
  const currentOrder = order[0];

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mt-40 flex w-full flex-col items-center justify-start lg:max-w-2xl">
        <div className="text-5xl">Order Detail</div>
        <div className="mt-12 flex w-full flex-col gap-4">
          <Summary
            orderId={currentOrder.orderId}
            createdAt={currentOrder.createdAt}
            receiptUrl={currentOrder.receiptUrl}
          />
          <Products products={currentOrder.products} />
          <DeliveryInfo orderForm={currentOrder.OrderForm[0]} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
