'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/entities/session/model/useSession';
import { ROUTES } from '@/shared/constants/routes';

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useSession();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push(ROUTES.USERS);
      } else {
        router.push(ROUTES.LOGIN);
      }
    }
  }, [isAuthenticated, loading, router]);

  return <div>Loading..</div>;
}