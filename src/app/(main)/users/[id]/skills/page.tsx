'use client';

import { useParams } from 'next/navigation';
import { UserSkillsWidget } from '@/widgets/user-skills/UserSkillsWidget';
import { Box, CircularProgress } from '@mui/material';
import { useSession } from '@/entities/session/model/useSession';

export default function UserSkillsPage() {
  const { id: userId } = useParams<{ id: string }>();
  const { user, loading } = useSession();

  const canEdit = useCanEditSkills(userId, user);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return <UserSkillsWidget userId={userId} canEdit={canEdit} />;
}

function useCanEditSkills(profileUserId: string, currentUser: any): boolean {
  if (!currentUser) return false;

  if (currentUser.role === 'Admin') {
    return true;
  }
  return currentUser.id === profileUserId;
}
