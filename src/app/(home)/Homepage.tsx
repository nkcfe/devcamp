'use client';

import React, { useEffect, useState } from 'react';

import type { User } from '@prisma/client';
import type { ProductType } from '@/module/type';

import Banner from '@/components/home/Banner';
import axios from 'axios';
import ProductList from '@/components/home/ProductList';
import CarouselInfo from '@/components/home/CarouselInfo';
import Footer from '@/components/home/Footer';

interface HomepageProps {
  user: User | null;
  products: ProductType[] | null;
}

const Homepage = (props: HomepageProps) => {
  const { user, products } = props;

  return (
    <div className="flex flex-col items-center justify-start">
      <Banner />
      <div className="mb-40 grid auto-cols-fr grid-cols-2 items-center justify-center gap-8 md:grid-cols-3">
        <ProductList products={products} />
      </div>
      <div className="mb-40 w-full">
        <CarouselInfo />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
