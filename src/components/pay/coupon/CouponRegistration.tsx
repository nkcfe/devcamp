import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  code: z.string().min(6, {
    message: '6글자 이상의 코드를 입력해주세요',
  }),
});

const CouponRegistration = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async ({ couponCode }: { couponCode: string }) => {
      await axios.post('/api/coupons', { couponCode });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: '쿠폰이 등록되었습니다.',
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: '쿠폰 등록 실패',
        description: '쿠폰 코드를 확인해주세요.',
        variant: 'destructive',
        duration: 2000,
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = () => {
    form.trigger('code');
    const codeState = form.getFieldState('code');
    if (!codeState.isDirty || codeState.invalid) return;
    mutate({ couponCode: form.getValues().code });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>쿠폰 등록</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="쿠폰 번호를 등록하세요." {...field} />
                </FormControl>
                <Button type="button" onClick={onSubmit}>
                  쿠폰 등록
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CouponRegistration;
