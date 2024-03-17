import { UserCouponType } from '@/module/type';

export const getCouponDiscount = (
  coupon: UserCouponType,
  totalPrice: number,
) => {
  if (coupon.type === 'PERCENTAGE') {
    return totalPrice * (coupon.discount / 100);
  } else {
    return coupon.discount;
  }
};
