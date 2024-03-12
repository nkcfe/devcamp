'use client';

import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserCouponType } from '@/module/type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface CouponApplyProps {
  handleApplyCoupon: (coupon: UserCouponType) => void;
  handleCancleCoupon: () => void;
}

const CouponApply = (props: CouponApplyProps) => {
  const { handleApplyCoupon, handleCancleCoupon } = props;
  const { toast } = useToast();

  const [coupon, setCoupon] = useState<string>('');

  const { data: coupons, isLoading } = useQuery<any, unknown, UserCouponType[]>(
    {
      queryKey: ['coupons'],
      queryFn: async () => {
        const response = await axios.get('/api/coupons');
        return response.data;
      },
    },
  );

  const handleCouponApply = () => {
    if (!coupon) {
      return toast({
        title: '쿠폰을 선택해주세요.',
        variant: 'destructive',
        duration: 2000,
      });
    }

    handleApplyCoupon(JSON.parse(coupon));
    toast({
      title: '쿠폰이 적용되었습니다.',
      duration: 2000,
    });
  };

  const handleCouponCancle = () => {
    setCoupon('');
    handleCancleCoupon();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Select value={coupon} onValueChange={setCoupon}>
        <div className="flex flex-col gap-2">
          <Label className="px-1">쿠폰 선택</Label>
          <div className="flex gap-2 px-2">
            <SelectTrigger disabled={coupons?.length === 0}>
              <SelectValue
                placeholder={
                  coupons?.length === 0
                    ? '등록된 쿠폰이 없습니다.'
                    : '쿠폰을 선택해주세요.'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {coupons?.map((coupon) => (
                <SelectItem
                  key={coupon.couponId}
                  value={JSON.stringify({
                    couponId: coupon.couponId,
                    code: coupon.code,
                    discount: coupon.discount,
                    type: coupon.type,
                    createdAt: coupon.createdAt,
                    expiredAt: coupon.expiredAt,
                  })}
                >
                  {coupon.type === 'PERCENTAGE' ? (
                    <div>{coupon.discount}% 할인 쿠폰</div>
                  ) : (
                    <div>{coupon.discount}원 할인 쿠폰</div>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
            {coupon && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleCouponCancle}
              >
                취소
              </Button>
            )}

            <Button type="button" onClick={handleCouponApply}>
              쿠폰적용
            </Button>
          </div>
        </div>
      </Select>
    </>
  );
};

export default CouponApply;
