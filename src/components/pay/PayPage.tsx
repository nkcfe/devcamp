'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OrderProductionInfo from './OrderProductionInfo';
import OrdererInfo from './OrdererInfo';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderType, ordererSchema } from '@/validators/orderer';
import DeliveryInfo from './DeliveryInfo';
import Coupon from './coupon';
import Summary from './Summary';
import Payment from './Payment';

const PayPage = () => {
  const { data } = useSession();
  const user = data?.user;
  const [isLoading, setIsLoading] = useState(false);

  const { data: cartItems, isLoading: isItemsLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axios.get('/api/cart');
      return response.data;
    },
  });

  const OrderForm = useForm({
    resolver: zodResolver(ordererSchema),
    defaultValues: {
      name: user?.name || '',
      phone: '',
      email: user?.email || '',
      recipient: '',
      recipientNumber: '',
      postcode: '',
      address: '',
      detailAddress: '',
      deliveryMemo: '',
    },
  });

  const handleSubmit = (data: OrderType) => {
    // setIsLoading(true);
  };

  useEffect(() => {
    if (user?.name && user?.email) {
      OrderForm.setValue('name', user?.name);
      OrderForm.setValue('email', user?.email);
    }
  }, [OrderForm, user?.email, user?.name]);

  if (isItemsLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary py-28">
      <div className="mx-auto flex flex-col items-center justify-start lg:max-w-4xl">
        <div className="text-4xl font-bold">결제하기</div>
        <form
          className="mt-20 grid w-full grid-cols-5 gap-6"
          onSubmit={OrderForm.handleSubmit(handleSubmit)}
        >
          <div className="col-span-3">
            <div className="flex flex-col gap-6">
              <OrderProductionInfo cartItems={cartItems} />
              <OrdererInfo OrderForm={OrderForm} />
              <DeliveryInfo OrderForm={OrderForm} />
              <Coupon />
            </div>
          </div>

          <div className="relative col-span-2 ">
            <div className="sticky top-20 flex flex-col gap-6">
              <Summary />
              <Payment />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayPage;
