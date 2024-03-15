import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import type { OrderForm, Product } from '@prisma/client';
import { useRouter } from 'next/navigation';

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

const OrderCard = (props: OrderPageProps) => {
  const { orders } = props;
  const router = useRouter();

  return orders.map((order) => (
    <Card
      key={order.orderId}
      className="w-full cursor-pointer rounded-none transition-colors duration-300 ease-in-out hover:bg-secondary"
      onClick={() => router.push(`/order/${order.orderId}`)}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{order.state}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 p-4 pt-0">
          <Image
            width={100}
            height={100}
            src={order.OrderForm[0].products[0].image}
            alt={order.orderName}
          />
          <div className="flex flex-col justify-center gap-2">
            <div className="text-sm text-gray-500">
              {format(new Date(order.createdAt), 'yyyy-MM-dd')} 결제
            </div>
            <div className="truncate">{order.orderName}</div>
            <div>{order.amount.toLocaleString()}원</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
};

export default OrderCard;
