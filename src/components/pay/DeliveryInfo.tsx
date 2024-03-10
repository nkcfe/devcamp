import React, { memo, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const memoList = [
  '부재 시 경비실에 맡겨주세요.😀',
  '배송 전 미리 연락 부탁드립니다.😃',
  '부재 시 전화 부탁드립니다.😄',
];

const DeliveryInfo = () => {
  const [isDirectMessage, setIsDirectMessage] = useState(false);

  const DeliveryForm = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      detailAddress: '',
      postcode: '',
      deliveryMemo: '',
    },
  });

  useEffect(() => {
    if (DeliveryForm.watch().deliveryMemo === '직접 입력') {
      DeliveryForm.setValue('deliveryMemo', '');
      setIsDirectMessage(true);
    } else if (memoList.includes(DeliveryForm.watch().deliveryMemo)) {
      setIsDirectMessage(false);
    }
  }, [DeliveryForm.watch().deliveryMemo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>주문자 정보</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 p-6 pt-0">
        <Form {...DeliveryForm}>
          <form>
            <div className="flex w-full">
              <FormField
                name="name"
                control={DeliveryForm.control}
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
                control={DeliveryForm.control}
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
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-end">
                <FormField
                  name="phone"
                  control={DeliveryForm.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>우편번호</FormLabel>
                      <FormControl>
                        <Input placeholder="우편 번호" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>주소 찾기</Button>
              </div>
              <FormField
                name="phone"
                control={DeliveryForm.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="주소" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={DeliveryForm.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="상세정보" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-2">
              <FormField
                control={DeliveryForm.control}
                name="deliveryMemo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>배송 메모</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="배송 메모를 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {memoList.map((memo) => (
                          <SelectItem key={memo} value={memo}>
                            {memo}
                          </SelectItem>
                        ))}

                        <SelectItem value="직접 입력">직접 입력</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isDirectMessage && (
              <div className="mt-2">
                <FormField
                  name="deliveryMemo"
                  control={DeliveryForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="배송 메모를 입력하세요."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DeliveryInfo;
