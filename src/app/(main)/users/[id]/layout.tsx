'use client';

import { ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';

import { UserProfileTabs } from '@/widgets/user-profile/ui/UserProfileTabs';
import { UserBreadcrumbClient } from '@/widgets/user-breadcrumb/ui/UserBreadcrumbClient';
import { useUser } from '@/entities/user/api/useUser';

export default function UserLayout({ children }: { children: ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useUser(id);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) return null;

  return (
    <Box px={6} py={1}>
      <UserBreadcrumbClient
        userId={user.id}
        firstName={user.profile.firstName}
        lastName={user.profile.lastName}
      />
      <UserProfileTabs userId={user.id} />
      <Box mt={4}>{children}</Box>
    </Box>
  );
}
