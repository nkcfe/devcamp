'use client';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
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

const CouponApply = () => {
  const { data: coupons, isLoading } = useQuery<any, unknown, UserCouponType[]>(
    {
      queryKey: ['coupons'],
      queryFn: async () => {
        const response = await axios.get('/api/coupons');
        return response.data;
      },
    },
  );
  const form = useForm({});

  function onSubmit() {}

  if (isLoading) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>쿠폰 적용</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="쿠폰을 선택해주세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {coupons?.map((coupon) => (
                    <SelectItem key={coupon.couponId} value={coupon.code}>
                      {coupon.type === 'PERCENTAGE' ? (
                        <div>{coupon.discount}% 할인 쿠폰</div>
                      ) : (
                        <div>{coupon.discount}원 할인 쿠폰</div>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">쿠폰적용</Button>
      </form>
    </Form>
  );
};

export default CouponApply;
