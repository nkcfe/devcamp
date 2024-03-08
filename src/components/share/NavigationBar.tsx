import React from 'react';
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
import { BiSolidCoffeeBean } from 'react-icons/bi';
import { Shadows_Into_Light } from 'next/font/google';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import AuthPage from '../auth/AuthPage';

const shadowIntoLight = Shadows_Into_Light({
  weight: ['400'],
  subsets: ['latin'],
});

const NavigationBar = () => {
  const router = useRouter();
  const { status } = useSession();

  return (
    <div className="container fixed top-0 z-30 flex h-14 w-full items-center justify-between bg-background">
      <div className="text-xl">
        <Link href="/" className="flex items-center justify-center gap-2">
          <BiSolidCoffeeBean />
          <div className={shadowIntoLight.className}>Monday Coffee</div>
        </Link>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push('/cart')}>
          <FiShoppingCart className="size-[1.2rem]" />
        </Button>
        <ModeToggle />
        {status === 'authenticated' ? (
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
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
  );
};

export default NavigationBar;
