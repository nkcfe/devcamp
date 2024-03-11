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
import Point from './coupon/Point';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const PayPage = () => {
  const { data } = useSession();
  const user = data?.user;
  const [isLoading, setIsLoading] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState('');
  const [applyPoint, setApplyPoint] = useState(0);

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

  const getCouponDiscount = () => {
    if (applyCoupon === '') return 0;
    if (totalPrice === undefined) return 0;

    const coupon = JSON.parse(applyCoupon);

    if (coupon.type === 'PERCENTAGE') {
      return totalPrice! * (coupon.discount / 100);
    } else {
      return coupon.discount;
    }
  };

  const handleSubmit = async (data: OrderType) => {
    const tossPayments = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string,
    );

    const finalPrice = totalPrice! - getCouponDiscount() - applyPoint;

    if (!cartItems) return;

    await tossPayments.requestPayment('카드', {
      amount: finalPrice,
      orderId: Math.random().toString(36).slice(2),
      orderName: `${cartItems[0].product.name}외 ${cartItems.length - 1}개의 상품`,
      successUrl: `${window.location.origin}/payments/success`,
      failUrl: `${window.location.origin}/payments/fail`,
    });
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
        <form
          onSubmit={OrderForm.handleSubmit(handleSubmit)}
          className="mt-20 grid w-full grid-cols-5 gap-6"
        >
          <div className="col-span-3">
            <div className="flex flex-col gap-6">
              <OrderProductionInfo cartItems={cartItems} />
              <OrdererInfo OrderForm={OrderForm} />
              <DeliveryInfo OrderForm={OrderForm} />
              <Coupon
                handleApplyCoupon={handleApplyCoupon}
                handleCancleCoupon={handleCancleCoupon}
              />
              <Point applyPoint={applyPoint} setApplyPoint={setApplyPoint} />
            </div>
          </div>

          <div className="relative col-span-2 ">
            <div className="sticky top-20 flex flex-col gap-6">
              <Summary
                totalPrice={totalPrice}
                getCouponDiscount={getCouponDiscount}
                applyPoint={applyPoint}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayPage;
