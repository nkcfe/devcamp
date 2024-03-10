'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

const PayPage = () => {
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axios.get('/api/cart');
      return response.data;
    },
  });

  console.log(cartItems);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary pt-28">
      <div className="container flex flex-col items-center justify-start">
        <div className="text-4xl font-bold">결제하기</div>
        <div className="mt-20 grid w-full grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>주문 상품 정보</CardTitle>
                </CardHeader>
                {cartItems.map((item: any) => {
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
                          <div className="font-semibold">
                            {item.product.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span>수량 : </span>
                            {item.quantity}개
                          </div>
                          <div className="text-sm font-bold">
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString()}
                            원
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  );
                })}
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>주문자 정보</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="bg-gray-500">ㅁㄴㅇㄹㅁㄴㅇㄹ</div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
