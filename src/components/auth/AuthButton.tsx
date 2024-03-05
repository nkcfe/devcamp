import React from 'react';
import { Button } from '../ui/button';
import { ScaleLoader } from 'react-spinners';

interface AuthButtonProps {
  isLoading: boolean;
  type: 'login' | 'register';
}

const AuthButton = (props: AuthButtonProps) => {
  const { isLoading, type } = props;
  return (
    <div className="pt-6 w-full px-1">
      <Button
        type="submit"
        className="w-full"
        variant="secondary"
        disabled={isLoading}
      >
        {isLoading && (
          <ScaleLoader color="#36d7b7" width={2} height={15} className="mr-2" />
        )}
        {type === 'login' ? 'Sign In' : 'Sign Up'}
      </Button>
    </div>
  );
};

export default AuthButton;
