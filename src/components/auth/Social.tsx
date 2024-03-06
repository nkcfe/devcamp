import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';

interface SocialProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Social = (props: SocialProps) => {
  const { isLoading, setIsLoading } = props;
  const { toast } = useToast();
  const router = useRouter();

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { callbackUrl: 'http://localhost:3000/' })
      .then((callback) => {
        if (callback?.error) {
          toast({
            title: '인증에 실패했습니다.',
            variant: 'destructive',
            duration: 2000,
          });
        }

        if (callback?.ok) {
          router.push('/');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <Button className="gap-2" onClick={() => socialAction('google')}>
        {isLoading ? (
          <ScaleLoader color="#ffffff" width={2} height={15} />
        ) : (
          <FcGoogle size={20} />
        )}

        <div>Continue with Google</div>
      </Button>
      <Button
        className="gap-2"
        variant="gray"
        onClick={() => socialAction('github')}
      >
        {isLoading ? (
          <ScaleLoader color="#e6e6e6" width={2} height={15} />
        ) : (
          <FaGithub size={20} />
        )}
        <div>Continue with Github</div>
      </Button>
      <Button
        className="gap-2"
        variant="green"
        onClick={() => socialAction('naver')}
      >
        {isLoading ? (
          <ScaleLoader color="#e2fff9" width={2} height={15} />
        ) : (
          <SiNaver size={14} />
        )}
        <div>Continue with Naver</div>
      </Button>
    </div>
  );
};

export default Social;
