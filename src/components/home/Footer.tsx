import React from 'react';
import { Truculenta } from 'next/font/google';
import { cn } from '@/lib/utils';

const truculenta = Truculenta({ weight: ['400'], subsets: ['latin'] });

const Footer = () => {
  return (
    <div className="flex w-full items-end justify-between bg-background p-2 pb-10 text-xs ">
      <div className="flex items-end">
        <div className={cn(truculenta.className, 'text-6xl')}>IKEYO®</div>
        <div>© 2022 Qode Interactive, All Rights Reserved</div>
      </div>

      <div>Address: Seoul, Korea CS</div>
    </div>
  );
};

export default Footer;
