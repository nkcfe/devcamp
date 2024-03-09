'use client';

import NavigationBar from '@/components/share/NavigationBar';
import { ThemeProvider } from '@/components/share/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

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
    <main>
      <NavigationBar />
      {children}
    </main>
  );
};
