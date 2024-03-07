import React from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';

const NavigationBar = () => {
  const router = useRouter();

  return (
    <div className="container fixed top-0 flex h-14 w-full items-center justify-between bg-background">
      <div className="text-xl">
        <Link href="/">Monday Coffee</Link>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push('/cart')}>
          Cart
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">User</Button>
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
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavigationBar;
