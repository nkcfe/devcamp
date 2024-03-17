'use client';

import React, { useEffect, useState } from 'react';

import type { User } from '@prisma/client';
import type { ProductType } from '@/module/type';

import Banner from '@/components/home/Banner';
import ProductList from '@/components/home/ProductList';
import Footer from '@/components/home/Footer';
import Category from '@/components/home/Category';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface HomepageProps {
  user: User | null;
  products: ProductType[] | null;
  categories: string[] | null;
}

const Homepage = (props: HomepageProps) => {
  const { products, categories } = props;
  const [selectedCategory, setSelectedCategory] = useState('ALL PRODUCTS');

  const {
    data: productItems,
    isLoading: isProductLoading,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('/api/products', {
        params: { category: selectedCategory },
      });
      return response.data;
    },
    initialData: products,
  });

  const { data: categoryItems } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('/api/categories');
      return response.data;
    },
    initialData: categories,
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    refetch();
  }, [refetch, selectedCategory]);

  return (
    <div className="flex flex-col items-center justify-start">
      <Banner />
      <div className="flex w-full flex-col lg:max-w-6xl">
        <hr className="my-10 border-black" />
        <Category
          categoryItems={categoryItems}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
        <ProductList
          productItems={productItems}
          isProductLoading={isProductLoading}
        />
        <hr className="my-10 border-black" />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
