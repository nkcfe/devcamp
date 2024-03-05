import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const Social = () => {
  const { toast } = useToast();
  const router = useRouter();

  const socialAction = (action: string) => {
    signIn(action, { callbackUrl: 'http://localhost:3000/' }).then(
      (callback) => {
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
      },
    );
  };

  return (
    <div className="w-full flex flex-col justify-center gap-2">
      <Button className="gap-2" onClick={() => socialAction('google')}>
        <FcGoogle size={20} />
        <div>Continue with Google</div>
      </Button>
      <Button
        className="gap-2"
        variant="gray"
        onClick={() => socialAction('github')}
      >
        <FaGithub size={20} />
        <div>Continue with Github</div>
      </Button>
      <Button
        className="gap-2"
        variant="green"
        onClick={() => socialAction('naver')}
      >
        <SiNaver size={14} />
        <div>Continue with Naver</div>
      </Button>
    </div>
  );
};

export default Social;
