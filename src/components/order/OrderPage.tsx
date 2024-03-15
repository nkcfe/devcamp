'use client';

import type { OrderForm, Product } from '@prisma/client';
import React from 'react';
import OrderCard from './OrderCard';

type Extend<T, U> = T & U;

type OrderFormWithProducts = Extend<OrderForm, { products: Product[] }>;

interface OrderPageProps {
  orders: {
    orderId: string;
    userId: string;
    paymentKey: string | null;
    orderName: string;
    receiptUrl: string | null;
    method: string | null;
    amount: number;
    createdAt: Date;
    state: string;
    OrderForm: OrderFormWithProducts[];
  }[];
}

const OrderPage = (props: OrderPageProps) => {
  const { orders } = props;

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mt-40 flex flex-col items-center justify-start lg:max-w-6xl">
        <div className="text-5xl">Order List</div>
        <div className="mt-12 flex w-full flex-col gap-4">
          <OrderCard orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
