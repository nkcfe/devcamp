'use client';

import { getProduct } from '@/app/utils/fetch';
import { ItemType, ProductType } from '@/module/type';
import { useCartStore } from '@/store';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { set } from 'zod';

import prisma from '@/db';
import axios from 'axios';

const CartPage = () => {
  const fetchData = async () => {
    const response = await axios.get('/api/cart');
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div className="mt-52"></div>;
};

export default CartPage;
