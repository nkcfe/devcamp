'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Banner from '@/components/home/Banner';

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
    <div>
      <Banner />
    </div>
  );
};

export default Homepage;
