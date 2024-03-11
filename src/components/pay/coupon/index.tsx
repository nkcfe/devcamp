import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import CouponApply from './CouponApply';
import CouponRegistration from './CouponRegistration';


interface CouponProps {
  handleApplyCoupon: (coupon: string) => void;
  handleCancleCoupon: () => void;
}

const Coupon = (props: CouponProps) => {
  const { handleApplyCoupon, handleCancleCoupon } = props;

  

  return (
    <Card>
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
