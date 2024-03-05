import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
      {children}
    </ThemeProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <main className="flex justify-center items-center w-screen h-screen relative">
      <ModeToggle className="absolute top-5 right-5" id="1" />
      {children}
    </main>
  );
};
