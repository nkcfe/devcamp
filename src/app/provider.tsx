'use client';

import NavigationBar from '@/components/share/NavigationBar';
import { ThemeProvider } from '@/components/share/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <main className="container">
      <NavigationBar />
      {children}
    </main>
  );
};
