import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import type { OrderForm } from '@prisma/client';
import { getCouponDiscount } from '@/utils/getDiscount';

interface PriceProps {
  orderForm: OrderForm;
}

const Price = (props: PriceProps) => {
  const { orderForm } = props;
  return (
    <Card className="rounded-none">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">금액 상세</CardTitle>
      </CardHeader>
      <hr className="m-2" />
      <CardContent className="flex flex-col gap-2 p-4 pt-0 text-sm font-semibold">
        <div className="flex justify-between">
          <div>최초 주문금액</div>
          <div className=" text-blue-600">
            {orderForm.initialPrice.toLocaleString()}원
          </div>
        </div>
        <div className="flex justify-between">
          <div>배송비</div>
          <div>+{orderForm.shippingCost?.toLocaleString()}원</div>
        </div>
        <div className="flex justify-between">
          <div>쿠폰 할인</div>
          <div>
            -
            {orderForm.applyCoupon
              ? getCouponDiscount(
                  JSON.parse(orderForm.applyCoupon),
                  orderForm.initialPrice,
                ).toLocaleString()
              : 0}
            원
          </div>
        </div>
        <div className="flex justify-between">
          <div>포인트 할인</div>
          <div>
            -
            {orderForm.pointDiscount
              ? orderForm.pointDiscount.toLocaleString()
              : 0}
            원
          </div>
        </div>
        <div className="flex justify-between text-base">
          <div>최종 결제금액</div>
          <div>{orderForm.finalPrice.toLocaleString()}원</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Price;
