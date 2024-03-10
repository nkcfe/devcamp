import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const Summary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>최종 결제금액</CardTitle>
        <CardContent className="">
          <div className="mt-6 flex flex-col">
            <div className="flex justify-between">
              <div className="text-gray-500">상품 가격</div>
              <div>18,000원</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">쿠폰 할인</div>
              <div>-1,000원</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">포인트 사용</div>
              <div>-0원</div>
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
          <div className="font-bold text-blue-500">19,500원</div>
        </div>
      </CardFooter>
      <div className="rounded-b-lg bg-secondary p-4 px-6">
        <span className="font-bold text-blue-500">700</span> 포인트 적립예정
      </div>
    </Card>
  );
};

export default Summary;
