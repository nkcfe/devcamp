import Image from 'next/image';
import React from 'react';

import { Truculenta } from 'next/font/google';
import { cn } from '@/lib/utils';

const truculenta = Truculenta({ weight: ['400'], subsets: ['latin'] });

const Banner = () => {
  return (
    <div className="mb-20 mt-32 flex flex-col items-center justify-center">
      <div className={cn(truculenta.className, 'text-[140px]')}>IKEYO®</div>

      <div className="w-[600px] text-center">
        Decorate your house as you see fit! With our grandiose collections of
        contemporary furniture and unique house décor we will help you make your
        household as comfortable as possible while.
      </div>
    </div>
  );
};

export default Banner;
