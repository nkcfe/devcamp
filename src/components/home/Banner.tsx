import Image from 'next/image';
import React from 'react';

import { Bebas_Neue } from 'next/font/google';
import { cn } from '@/lib/utils';

const bebas = Bebas_Neue({ weight: ['400'], subsets: ['latin'] });

const Banner = () => {
  return (
    <div className="mt-14 flex h-96 w-full items-center justify-center ">
      <div className={cn(bebas.className, 'text-[140px]')}>THE BEST COFFEE</div>
    </div>
  );
};

export default Banner;
