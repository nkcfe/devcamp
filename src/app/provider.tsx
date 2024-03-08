'use client';

import NavigationBar from '@/components/share/NavigationBar';
import { ThemeProvider } from '@/components/share/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
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
