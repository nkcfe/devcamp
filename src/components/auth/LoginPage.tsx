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

import { loginSchema } from '@/validators/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import Social from '../../components/auth/Social';
import Guide from '../../components/auth/Guide';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HorizonLine from '@/components/auth/HorizonLine';
import AuthButton from './AuthButton';

type RegisterInput = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isPwShow, setIsPwShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handlePwShow = () => {
    setIsPwShow(!isPwShow);
  };

  const handleSubmit = (data: RegisterInput) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast({
            title: '로그인에 실패했습니다.',
            variant: 'destructive',
            duration: 2000,
          });
        }

        if (callback?.ok) {
          router.push('/');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-[380px]">
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
          <CardContent className="pt-4">
            <Social isLoading={isLoading} setIsLoading={setIsLoading} />
            <HorizonLine />
            <Form {...form}>
              <form
                className="relative space-y-3 overflow-x-hidden"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isPwShow ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            className="absolute right-1 top-[50%] translate-y-[-50%]"
                            variant="secondary"
                            size="xs"
                            type="button"
                            onClick={handlePwShow}
                          >
                            {isPwShow ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AuthButton isLoading={isLoading} type="login" />
              </form>
            </Form>
            <Guide type="login" />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LoginPage;
