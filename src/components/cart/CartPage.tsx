'use client';

import { getProduct } from '@/app/utils/fetch';
import { ItemType, ProductType } from '@/module/type';
import { useCartStore } from '@/store';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { set } from 'zod';

import prisma from '@/db';
import axios from 'axios';
import { Progress } from '../ui/progress';

const CartPage = () => {
  const fetchData = async () => {
    const response = await axios.get('/api/cart');
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-24 flex flex-col items-center justify-start">
      <div className="flex w-96 flex-col items-center justify-center">
        <div className="text-4xl font-bold">Cart</div>
        <div className="mt-12">Shop for $34 more to enjoy FREE Shipping</div>
        <Progress value={50} className="mt-6" />
      </div>

      <div>
        
      </div>
    </div>
  );
};

export default CartPage;
