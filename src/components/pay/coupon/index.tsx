import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import CouponApply from './CouponApply';
import CouponRegistration from './CouponRegistration';
import { UserCouponType } from '@/module/type';

interface CouponProps {
  handleApplyCoupon: (coupon: UserCouponType) => void;
  handleCancleCoupon: () => void;
}

const Coupon = (props: CouponProps) => {
  const { handleApplyCoupon, handleCancleCoupon } = props;

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>쿠폰</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 p-6 pt-0">
        <div className="flex flex-col gap-6">
          <CouponApply
            handleApplyCoupon={handleApplyCoupon}
            handleCancleCoupon={handleCancleCoupon}
          />
          <CouponRegistration />
        </div>
      </CardContent>
    </Card>
  );
};

export default Coupon;
