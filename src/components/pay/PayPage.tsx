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
import { CartItemType } from '@/module/type';

const PayPage = () => {
  const { data } = useSession();
  const user = data?.user;
  const [isLoading, setIsLoading] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState('');

  const { data: cartItems, isLoading: isItemsLoading } = useQuery<
    any,
    unknown,
    CartItemType[]
  >({
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

  const handleApplyCoupon = (coupon: string) => {
    setApplyCoupon(coupon);
  };

  const handleCancleCoupon = () => {
    setApplyCoupon('');
  };

  useEffect(() => {
    if (user?.name && user?.email) {
      OrderForm.setValue('name', user?.name);
      OrderForm.setValue('email', user?.email);
    }
  }, [OrderForm, user?.email, user?.name]);

  if (isItemsLoading) return <div>Loading...</div>;

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-secondary py-28">
      <div className="mx-auto flex flex-col items-center justify-start lg:max-w-4xl">
        <div className="text-4xl font-bold">결제하기</div>
        <div className="mt-20 grid w-full grid-cols-5 gap-6">
          <div className="col-span-3">
            <form
              onSubmit={OrderForm.handleSubmit(handleSubmit)}
              className="flex flex-col gap-6"
            >
              <OrderProductionInfo cartItems={cartItems} />
              <OrdererInfo OrderForm={OrderForm} />
              <DeliveryInfo OrderForm={OrderForm} />
              <Coupon
                handleApplyCoupon={handleApplyCoupon}
                handleCancleCoupon={handleCancleCoupon}
              />
            </form>
          </div>

          <div className="relative col-span-2 ">
            <div className="sticky top-20 flex flex-col gap-6">
              <Summary
                totalPrice={totalPrice}
                applyCoupon={applyCoupon}
              />
              <Payment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
