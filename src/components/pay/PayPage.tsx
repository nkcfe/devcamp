'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import OrderProductionInfo from './OrderProductionInfo';
import OrdererInfo from './OrdererInfo';
import { useSession } from 'next-auth/react';

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary pt-28">
      <div className="mx-auto flex flex-col items-center justify-start lg:max-w-4xl">
        <div className="text-4xl font-bold">결제하기</div>
        <div className="mt-20 grid w-full grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="flex flex-col gap-6">
              <OrderProductionInfo cartItems={cartItems} />
              <OrdererInfo user={user} />
            </div>
          </div>
          <div className="bg-gray-500">ㅁㄴㅇㄹㅁㄴㅇㄹ</div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
