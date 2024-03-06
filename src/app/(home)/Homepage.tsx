'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HomepageProps {
  user: User | null;
}

const Homepage = (props: HomepageProps) => {
  const { user } = props;
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  if (windowWidth === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Confetti width={windowWidth} />
      <Card className="flex flex-col items-center justify-center space-y-10 p-10">
        <CardHeader>
          <div className="text-8xl font-bold ">🎉</div>
        </CardHeader>
        <CardTitle>
          <div className="text-6xl font-bold text-blue-600">Welcome!</div>
        </CardTitle>
        <CardContent>
          <div className="text-2xl font-semibold">
            안녕하세요 {user?.email}님
          </div>
        </CardContent>
        <Button size={'lg'} onClick={() => signOut()}>
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default Homepage;
