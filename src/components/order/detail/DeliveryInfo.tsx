import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { OrderForm } from '@prisma/client';

interface OrderDetailPageProps {
  orderForm: OrderForm;
}

const DeliveryInfo = (props: OrderDetailPageProps) => {
  const { orderForm } = props;
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">배송지 정보</CardTitle>
      </CardHeader>
      <hr className="m-2" />
      <CardContent className="flex flex-col gap-2 p-4 pt-0 text-sm">
        <div className="flex">
          <div className="w-20 text-gray-700">수령인</div>
          <div className="">{orderForm.name}</div>
        </div>
        <div className="flex">
          <div className="w-20 text-gray-700">연락처</div>
          <div>{orderForm.phone}</div>
        </div>
        <div className="flex">
          <div className="w-20 text-gray-700">배송지</div>
          <div className="flex flex-col">
            <div>{orderForm.postcode}</div>
            <div>{orderForm.address}</div>
            <div>{orderForm.detailAddress}</div>
          </div>
        </div>
        <div className="flex">
          <div className="w-20 text-sm text-gray-700">배송메모</div>
          <div>{orderForm.deliveryMemo}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryInfo;
