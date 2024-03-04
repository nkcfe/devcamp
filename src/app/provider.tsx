import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return (
    <>
      <ToastContainer
        autoClose={1000}
        pauseOnFocusLoss={false}
        position="top-center"
      />
      {children}
    </>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      {children}
    </main>
  );
};
