'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LandingPage from '@/components/landing-page';
import LoadingSpinner from '@/components/loading-spinner';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingSpinner size="w-24 h-24" />;
  }

  if (status === 'authenticated') {
    return <LoadingSpinner size="w-24 h-24" />;
  }

  return <LandingPage />;
}