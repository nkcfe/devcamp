import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';

const Point = () => {
  return (
    <div className="">
      <Label>포인트 사용</Label>
      <div className="mt-2 flex gap-1">
        <Input placeholder="쿠폰 번호를 입력하세요." />
        <Button>전액 사용</Button>
      </div>
    </div>
  );
};

export default Point;
