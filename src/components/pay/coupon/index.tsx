import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import CouponApply from './CouponApply';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/Input';
import CouponRegistration from './CouponRegistration';
import Point from './Point';

const Coupon = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>쿠폰/포인트</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 p-6 pt-0">
        <div className="flex flex-col gap-6">
          <CouponApply />
          <CouponRegistration />
          <Point />
        </div>
      </CardContent>
    </Card>
  );
};

export default Coupon;
