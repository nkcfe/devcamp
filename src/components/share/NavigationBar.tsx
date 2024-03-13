'use client';

import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { FaChair } from 'react-icons/fa';

import { Truculenta } from 'next/font/google';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import AuthPage from '../auth/AuthPage';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Badge } from '../ui/badge';
import { useCartCounts } from '@/store/useCartCounts';

const truculenta = Truculenta({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const NavigationBar = () => {
  const router = useRouter();
  const { status } = useSession();
  const { cartCounts } = useCartCounts();

  const { data: cartItemCounts, refetch } = useQuery({
    queryKey: ['cartItemCounts'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/cart/count');
        return response.data;
      } catch (error) {
        return console.error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, status, cartCounts]);

  return (
    <div className="fixed top-0 z-30 flex w-screen items-center justify-center bg-background/40 backdrop-blur-lg">
      <div className="mt-2 flex h-14 w-full items-center justify-between border-y border-y-gray-500 py-10 lg:max-w-6xl">
        <div className="text-xl">
          <Link href="/" className="flex items-center justify-center gap-2">
            <FaChair />
            <div className={cn('font-bold', truculenta.className)}>IKEYO®</div>
          </Link>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          {status === 'authenticated' ? (
            <>
              <Button
                variant="outline"
                onClick={() => router.push('/cart')}
                className="relative"
              >
                <FiShoppingCart className="size-[1.2rem]" />
                {cartCounts === 0 ? null : (
                  <Badge className="absolute right-[-8px] top-[-8px] size-5 justify-center rounded-full p-1">
                    {cartItemCounts}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    <FiUser className="size-[1.2rem]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => router.push('/mypage')}>
                    My page
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      signOut();
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">Login</Button>
              </DialogTrigger>
              <DialogContent className="mx-0 flex w-auto items-center justify-center">
                <AuthPage />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
