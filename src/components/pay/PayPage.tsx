'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import OrderProductionInfo from './OrderProductionInfo';
import OrdererInfo from './OrdererInfo';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ordererSchema } from '@/validators/orderer';
import DeliveryInfo from './DeliveryInfo';

const PayPage = () => {
  const { data } = useSession();
  const user = data?.user;

  const { data: cartItems, isLoading } = useQuery({
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
    },
  });

  useEffect(() => {
    if (user?.name && user?.email) {
      OrderForm.setValue('name', user?.name);
      OrderForm.setValue('email', user?.email);
    }
  }, [OrderForm, user?.email, user?.name]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary py-28">
      <div className="mx-auto flex flex-col items-center justify-start lg:max-w-4xl">
        <div className="text-4xl font-bold">결제하기</div>
        <div className="mt-20 grid w-full grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="flex flex-col gap-6">
              <OrderProductionInfo cartItems={cartItems} />
              <OrdererInfo user={user} OrderForm={OrderForm} />
              <DeliveryInfo />
            </div>
          </div>
          <div className="bg-gray-500">ㅁㄴㅇㄹㅁㄴㅇㄹ</div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
