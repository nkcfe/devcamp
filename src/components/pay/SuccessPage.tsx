'use client';

import React from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

import { Check, Home, Receipt } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Payment {
  payments: {
    orderName: string;
    approvedAt: string;
    receipt: {
      url: string;
    };
    totalAmount: number;
    method: '카드' | '가상계좌' | '계좌이체';
    paymentKey: string;
    orderId: string;
  };
}

const SuccessPage = (props: Payment) => {
  const { payments } = props;
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <motion.div
          className="flex size-16 items-center justify-center rounded-full bg-blue-400"
          animate={{
            scale: [1, 1.1, 1],
            borderRadius: ['100%', '100%'],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <Check className="size-10 text-white" />
        </motion.div>
        <Confetti numberOfPieces={100} />
        <h1 className="text-3xl font-semibold">주문이 완료되었습니다.</h1>
        <p>{payments.orderName}</p>
        <p className="text-gray-500">Order #{payments.orderId}</p>
        <Button variant="secondary" onClick={() => router.push('/')}>
          <Home size={14} className="mr-2" /> 홈페이지로 이동
        </Button>
        <Button variant="secondary" onClick={() => router.push('/order')}>
          <Receipt size={16} className="mr-2" /> 주문내역으로 이동
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
