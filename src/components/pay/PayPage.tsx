'use client';

import React, { useCallback, useEffect, useState } from 'react';
import OrderProductionInfo from './OrderProductionInfo';
import OrdererInfo from './OrdererInfo';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderType, ordererSchema } from '@/validators/orderer';
import DeliveryInfo from './DeliveryInfo';
import Coupon from './coupon';
import Summary from './Summary';
import type { OrderProductType, UserCouponType } from '@/module/type';
import Point from './coupon/Point';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface PayPageProps {
  cartItems: { cartItems: OrderProductType[]; totalPrice: number };
}

const PayPage = (props: PayPageProps) => {
  const { data } = useSession();
  const { cartItems } = props.cartItems;
  const totalPrice = props.cartItems.totalPrice;
  const user = data?.user;

  const { toast } = useToast();
  const router = useRouter();

  const [applyCoupon, setApplyCoupon] = useState<UserCouponType | null>(null);
  const [applyPoint, setApplyPoint] = useState(0);
  const [paymentPrice, setPaymentPrice] = useState(totalPrice);
  const [shippingPrice] = useState(totalPrice > 1000000 ? 0 : 2500);
  const [accuralPoint] = useState(Math.floor(totalPrice * 0.01));

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

  const getCouponDiscount = useCallback(
    (coupon?: UserCouponType) => {
      if (coupon) {
        if (coupon.type === 'PERCENTAGE') {
          return totalPrice * (coupon.discount / 100);
        } else {
          return coupon.discount;
        }
      } else {
        if (!applyCoupon) return 0;

        if (applyCoupon?.type === 'PERCENTAGE') {
          return totalPrice * (applyCoupon?.discount / 100);
        } else {
          return applyCoupon?.discount;
        }
      }
    },
    [applyCoupon, totalPrice],
  );

  const handleSubmit = async (data: OrderType) => {
    if (!cartItems) return;
    const randomId = Math.random().toString(36).slice(2);
    if (paymentPrice <= 0) {
      router.push('/payments/success');
    } else {
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string,
      );
      await axios.post('/api/order', {
        ...data,
        initialPrice: totalPrice,
        shippingPrice,
        cartItems,
        applyCoupon: getCouponDiscount(),
        applyPoint,
        paymentPrice,
        accuralPoint,
        orderId: randomId,
        orderName: `${cartItems[0].product.name}외 ${cartItems.length - 1}개의 상품`,
      });

      await tossPayments.requestPayment('카드', {
        amount: paymentPrice,
        orderId: randomId,
        orderName: `${cartItems[0].product.name}외 ${cartItems.length - 1}개의 상품`,
        successUrl: `${window.location.origin}/api/payments`,
        failUrl: `${window.location.origin}/api/payments/fail`,
      });
    }
  };

  const handleApplyCoupon = (coupon: UserCouponType) => {
    if (applyPoint) {
      setApplyPoint(0);
      toast({
        title: '결제 금액이 변경되었습니다.',
        description: '포인트 금액을 다시 설정해주세요.',
        variant: 'destructive',
      });
    }
    if (coupon.type === 'PERCENTAGE') {
      const discountPrice = getCouponDiscount(coupon);
      setPaymentPrice(paymentPrice - discountPrice);
    } else {
      setPaymentPrice(paymentPrice - coupon.discount);
    }

    setApplyCoupon(coupon);
  };

  const handleCancleCoupon = () => {
    if (!applyCoupon) return;

    if (applyCoupon?.type === 'PERCENTAGE') {
      const discountPrice = getCouponDiscount(applyCoupon);
      setPaymentPrice(paymentPrice + discountPrice);
    } else {
      setPaymentPrice(paymentPrice + applyCoupon?.discount);
    }
    setApplyCoupon(null);
  };

  useEffect(() => {
    setPaymentPrice(
      totalPrice - getCouponDiscount() - applyPoint + shippingPrice,
    );
  }, [applyPoint, getCouponDiscount, shippingPrice, totalPrice]);

  useEffect(() => {
    if (user?.name && user?.email) {
      OrderForm.setValue('name', user?.name);
      OrderForm.setValue('email', user?.email);
    }
  }, [OrderForm, user?.email, user?.name]);

  return (
    <div className="min-h-screen bg-background py-28">
      <div className="mx-auto flex flex-col items-center justify-start lg:max-w-6xl">
        <div className="mt-20 text-5xl">CHECKOUT</div>

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
              <Point
                applyPoint={applyPoint}
                setApplyPoint={setApplyPoint}
                couponApplyPrice={totalPrice - getCouponDiscount()}
                shippingPrice={shippingPrice}
              />
            </div>
          </div>

          <div className="relative col-span-2 ">
            <div className="sticky top-20 flex flex-col gap-6">
              <Summary
                totalPrice={totalPrice}
                getCouponDiscount={getCouponDiscount}
                applyPoint={applyPoint}
                accuralPoint={accuralPoint}
                paymentPrice={paymentPrice}
                shippingPrice={shippingPrice}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayPage;
