'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/entities/session/model/useSession';

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useSession();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/users');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  return <div>Loading..</div>;
}