'use client';

import { Order, OrderForm } from '@prisma/client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

interface OrderWithOrderForm extends Order {
  OrderForm: OrderForm;
}

interface OrderPageProps {
  orders: OrderWithOrderForm[];
}

const OrderPage = (props: OrderPageProps) => {
  const { orders } = props;

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mt-40 flex flex-col items-center justify-start lg:max-w-6xl">
        <div className="text-5xl">Order List</div>

        <div className="mt-12 w-full">
          {orders.map((order) => (
            <Card key={order.orderId} className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">{order.state}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  <Image width={100} height={100} className="bg-gray-500" />
                  <div className="flex flex-col">
                    <div>{new Date(order.createdAt).toDateString()}</div>
                    <div>{order.orderName}</div>
                    <div>{order.amount}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>{}</div>
      </div>
    </div>
  );
};

export default OrderPage;
