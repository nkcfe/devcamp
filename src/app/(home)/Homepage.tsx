'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { registerSchema } from '@/validators/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { PiArrowRight } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { toast } from 'react-toastify';

type RegisterInput = z.infer<typeof registerSchema>;

const Homepage = () => {
  const [step, setStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: '',
      email: '',
      role: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleNextStep = () => {
    form.trigger(['phone', 'email', 'username', 'role']);
    const phoneState = form.getFieldState('phone');
    const emailState = form.getFieldState('email');
    const usernameState = form.getFieldState('username');
    const roleState = form.getFieldState('role');

    if (!phoneState.isDirty || phoneState.invalid) return;
    if (!emailState.isDirty || emailState.invalid) return;
    if (!usernameState.isDirty || usernameState.invalid) return;
    if (!roleState.isDirty || roleState.invalid) return;

    setStep(1);
  };

  const handlePrevStep = () => {
    setStep(0);
  };

  const handleSubmit = (data: RegisterInput) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword)
      return toast.error('비밀번호가 일치하지 않습니다.');
    alert(JSON.stringify(data, null, 4));
  };

  return (
    <div className="w-[380px]">
      <Card>
        <CardHeader>
          <CardTitle>계정을 생성합니다.</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
          <CardContent className="pt-4">
            <Form {...form}>
              <form
                className="relative space-y-3 overflow-x-hidden"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <motion.div
                  className={cn('space-y-3')}
                  animate={{ translateX: `${step * -100}%` }}
                  transition={{ ease: 'easeInOut' }}
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="아무개" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input placeholder="chul@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>연락처</FormLabel>
                        <FormControl>
                          <Input placeholder="01012341234" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>역할</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="역할을 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">관리자</SelectItem>
                            <SelectItem value="user">일반사용자</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  className={cn('space-y-3 absolute top-0 left-0 right-0')}
                  animate={{ translateX: `${(1 - step) * 200}%` }}
                  style={{ translateX: `${(1 - step) * 100}%` }}
                  transition={{
                    ease: 'easeInOut',
                  }}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <FormControl>
                          <Input type={'password'} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호 확인</FormLabel>
                        <FormControl>
                          <Input type={'password'} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <div className="flex gap-2 p-1">
                  <Button
                    type="button"
                    className={cn('flex gap-2', { hidden: step === 1 })}
                    onClick={handleNextStep}
                  >
                    다음 단계로
                    <PiArrowRight />
                  </Button>
                  <Button className={cn({ hidden: step === 0 })} type="submit">
                    계정 등록하기
                  </Button>
                  <Button
                    type="button"
                    variant={'ghost'}
                    className={cn({ hidden: step === 0 })}
                    onClick={handlePrevStep}
                  >
                    이전 단계로
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Homepage;
