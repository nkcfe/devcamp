import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UseFormReturn, useForm } from 'react-hook-form';
import { User } from 'next-auth';
import { UserType } from '@/module/type';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ordererSchema } from '@/validators/orderer';

interface OrdererInfoProps {
  user: UserType | undefined;
  OrderForm: UseFormReturn<
    {
      name: string;
      phone: string;
      email: string;
    },
    any,
    undefined
  >;
}

const OrdererInfo = (props: OrdererInfoProps) => {
  const { user, OrderForm } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>주문자 정보</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 p-6 pt-0">
        <Form {...OrderForm}>
          <form>
            <div className="flex w-full">
              <FormField
                name="name"
                control={OrderForm.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="홍길동" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={OrderForm.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>전화번호</FormLabel>
                    <FormControl>
                      <Input placeholder="0100000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="email"
              control={OrderForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OrdererInfo;
