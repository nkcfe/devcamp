'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Button } from '../ui/button';

interface SummaryProps {
  totalPrice: number | undefined;
  getCouponDiscount: () => number;
  applyPoint: number;
}

const Summary = (props: SummaryProps) => {
  const { totalPrice, getCouponDiscount, applyPoint } = props;

  const handleOrder = async () => {};

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>최종 결제금액</CardTitle>
          <CardContent className="">
            <div className="mt-6 flex flex-col">
              <div className="flex justify-between">
                <div className="text-gray-500">상품 가격</div>
                <div>{totalPrice?.toLocaleString()}원</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-500">쿠폰 할인</div>
                <div>-{getCouponDiscount().toLocaleString()}원</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-500">포인트 사용</div>
                <div>-{applyPoint.toLocaleString()}원</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-500">배송비</div>
                <div>+2,500원</div>
              </div>
            </div>
          </CardContent>
        </CardHeader>
        <hr className="mx-4 mb-4" />
        <CardFooter>
          <div className="flex w-full justify-between">
            <div className="text-gray-800">총 결제금액</div>
            <div className="font-bold text-blue-500">
              {(
                totalPrice! -
                getCouponDiscount() -
                applyPoint
              ).toLocaleString()}
              원
            </div>
          </div>
        </CardFooter>
        <div className="rounded-b-lg bg-secondary p-4 px-6">
          <span className="font-bold text-blue-500">
            {(totalPrice! * 0.1).toLocaleString()}
          </span>{' '}
          포인트 적립예정
        </div>
        <Button
          className="w-full rounded-t-none py-8 text-xl"
          size="lg"
          type="submit"
        >
          결제하기
        </Button>
      </Card>
    </>
  );
};

export default Summary;
