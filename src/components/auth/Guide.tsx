import Link from 'next/link';
import React from 'react';

interface GuidProps {
  type: 'login' | 'register';
}

const Guide = (props: GuidProps) => {
  const { type } = props;
  return (
    <div className="flex justify-center mt-10 text-xs text-gray-400">
      {type === 'register' ? 'Have an account' : `Don't have an account`}?&nbsp;
      <Link
        href={type === 'register' ? '/login' : '/register'}
        className="text-gray-600 underline"
      >
        {type === 'register' ? 'Sign In Now' : `Sign Up Now`}
      </Link>
    </div>
  );
};

export default Guide;
