import React, { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { IoIosCloseCircle } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

interface PointProps {
  setApplyPoint: React.Dispatch<React.SetStateAction<number>>;
  applyPoint: number;
}

const Point = (props: PointProps) => {
  const { setApplyPoint, applyPoint } = props;
  const { data: availablePoint, isLoading } = useQuery({
    queryKey: ['point'],
    queryFn: async () => {
      const response = await axios.get('/api/point');
      return response.data;
    },
  });

  const handleValidatedPoint = (point: number) => {
    if (point > availablePoint.point) {
      setApplyPoint(availablePoint.point);
    }
  };

  const handleChangePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^0-9]/g, '');

    if (!isNaN(Number(filteredValue))) {
      setApplyPoint(Number(filteredValue));
    }
  };

  const handleApplyAllPoint = () => {
    setApplyPoint(availablePoint.point);
  };

  const handleCanclePoint = () => {
    setApplyPoint(0);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>포인트</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 p-6 pt-0">
        <div className="mt-2 flex gap-2">
          <div className="relative w-full">
            <Input
              className="pr-14 text-right text-lg font-bold"
              placeholder="0"
              disabled={availablePoint.point === 0}
              value={applyPoint.toLocaleString()}
              onChange={(e) => handleChangePoint(e)}
              onBlur={() => handleValidatedPoint(applyPoint)}
            />
            <div className="absolute right-0 top-0 flex items-center justify-center">
              <div>원</div>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleCanclePoint}
              >
                <IoIosCloseCircle size={20} />
              </Button>
            </div>
          </div>
          <Button type="button" onClick={handleApplyAllPoint}>
            전액 사용
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center gap-2">
          <div>사용 가능 포인트 :</div>
          <div className="font-bold">
            {(availablePoint.point - applyPoint).toLocaleString()}원
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Point;
