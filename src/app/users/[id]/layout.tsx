'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';

import { UserProfileTabs } from '@/widgets/user-profile/ui/UserProfileTabs';
import { UserBreadcrumb } from '@/widgets/user-breadcrumb/ui/UserBreadcrumb';
import { User } from '@/entities/user/model/types';
import { getUserMock } from '@/entities/user/api/mock';



export default function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserMock(id).then(setUser);
  }, [id]);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={6} py={1}>
      <UserBreadcrumb
        userId={user.id}
        firstName={user.profile.firstName}
        lastName={user.profile.lastName}
      />
      <UserProfileTabs userId={user.id} />
      <Box mt={4}>{children}</Box>
    </Box>
  );
}
