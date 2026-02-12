'use client';

import { useParams } from 'next/navigation';
import { UserSkillsWidget } from '@/widgets/user-skills/UserSkillsWidget';
import { Box, CircularProgress } from '@mui/material';
import { useSession } from '@/entities/session/model/useSession';
import { useCanEditSkills } from './hooks/useCanEditSkills';

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
