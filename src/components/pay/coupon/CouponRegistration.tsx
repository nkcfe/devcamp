import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';

const CouponRegistration = () => {
  return (
    <div className="">
      <Label>쿠폰 등록</Label>
      <div className="mt-2 flex gap-1">
        <Input placeholder="쿠폰 번호를 입력하세요." />
        <Button>쿠폰 등록</Button>
      </div>
    </div>
  );
};

export default CouponRegistration;
