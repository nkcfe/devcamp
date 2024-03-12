import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/Input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { DialogTitle } from '@radix-ui/react-dialog';
import { UseFormReturn } from 'react-hook-form';
import { OrderType } from '@/validators/orderer';

const memoList = [
  '부재 시 경비실에 맡겨주세요.😀',
  '배송 전 미리 연락 부탁드립니다.😃',
  '부재 시 전화 부탁드립니다.😄',
];

interface DeliveryInfoProps {
  OrderForm: UseFormReturn<OrderType, any, undefined>;
}

const DeliveryInfo = (props: DeliveryInfoProps) => {
  const { OrderForm } = props;
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    OrderForm.setValue('postcode', data.zonecode);
    OrderForm.setValue('address', fullAddress);
  };

  useEffect(() => {
    if (OrderForm.watch().deliveryMemo === '직접 입력') {
      OrderForm.setValue('deliveryMemo', '');
      setIsDirectMessage(true);
    } else if (memoList.includes(OrderForm.watch().deliveryMemo)) {
      setIsDirectMessage(false);
    }
  }, [OrderForm.watch().deliveryMemo]);

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>배송지 정보</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 p-6 pt-0">
        <Form {...OrderForm}>
          <div>
            <div className="flex w-full">
              <FormField
                name="recipient"
                control={OrderForm.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>수령자</FormLabel>
                    <FormControl>
                      <Input placeholder="홍길동" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="recipientNumber"
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
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-end">
                <FormField
                  name="postcode"
                  control={OrderForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>우편번호</FormLabel>
                      <div className="flex gap-1">
                        <FormControl>
                          <Input placeholder="우편 번호" {...field} />
                        </FormControl>
                        <Button
                          onClick={() => setIsDialogOpen(true)}
                          type="button"
                        >
                          주소 찾기
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="address"
                control={OrderForm.control}
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
                name="detailAddress"
                control={OrderForm.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="상세주소" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-2">
              <FormField
                control={OrderForm.control}
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
                  control={OrderForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="배송 메모를 입력하세요."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </Form>
      </CardContent>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>주소 찾기</DialogTitle>
          </DialogHeader>

          <DaumPostcodeEmbed
            onComplete={handleComplete}
            className="h-[500px]"
            onClose={() => setIsDialogOpen(false)}
            style={{ width: '100%', height: '300' }}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DeliveryInfo;
