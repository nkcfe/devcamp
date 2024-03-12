import { cn } from '@/lib/utils';
import React from 'react';

interface CategoryProps {
  categoryItems: string[] | null;
  selectedCategory: string;
  handleCategoryClick: (category: string) => void;
}

const Category = (props: CategoryProps) => {
  const { categoryItems, selectedCategory, handleCategoryClick } = props;

  if (!categoryItems) return null;

  return (
    <div className="mb-10 flex items-center justify-center gap-10">
      {['ALL PRODUCTS', ...categoryItems].map((item) => (
        <div
          key={item}
          onClick={() => handleCategoryClick(item)}
          className={cn(
            'cursor-pointer transition-colors duration-300 ease-in-out hover:text-black',
            item === selectedCategory ? 'text-black' : 'text-gray-400',
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Category;
