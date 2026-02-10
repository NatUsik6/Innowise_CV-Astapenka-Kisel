'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useParams } from 'next/navigation';

import { ProfileForm } from '@/features/update-profile/ui/ProfileForm';
import { UserProfileHeader } from '@/widgets/user-profile/ui/UserProfileHeader';
import { useUser } from '@/entities/user/api/useUser';
import { useCurrentUser } from '@/entities/auth/model/useCurrentUser';
import { User } from '@/entities/user/model/types';
import { useDepartments } from '@/entities/user/api/department/api/useDepartments';
import { usePositions } from '@/entities/user/api/position/api/usePositions';

import {
  pageContainerSx,
  formWrapperSx,
  actionsWrapperSx,
  updateButtonSx,
} from './ProfilePage.styles';
import { useUpdateProfile } from '@/entities/user/api/users/useUpdateProfile';
import { useUpdateUser } from '@/entities/user/api/users/useUpdateUser';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();

  const { user: pageUser, loading: userLoading, refetch } = useUser(id);
  const { user: currentUser, loading: authLoading } = useCurrentUser();

  const { departments } = useDepartments();
  const { positions } = usePositions();

  const [draftUser, setDraftUser] = useState<User | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [updateProfile, { loading: profileLoading }] = useUpdateProfile(id);
  const [updateUser, { loading: userUpdating }] = useUpdateUser();

  useEffect(() => {
    if (pageUser) {
      setDraftUser(pageUser);
    }
  }, [pageUser]);

  const isAdmin = currentUser?.role === 'Admin';
  const canEdit = isAdmin || currentUser?.id === pageUser?.id;

  const isChanged = useMemo(() => {
    if (!pageUser || !draftUser) return false;
    return (
      pageUser.profile.firstName !== draftUser.profile.firstName ||
      pageUser.profile.lastName !== draftUser.profile.lastName ||
      pageUser.department !== draftUser.department ||
      pageUser.position !== draftUser.position
    );
  }, [pageUser, draftUser]);

  const handleProfileChange = (data: Partial<User>) => {
    setDraftUser(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        ...data,
        profile: data.profile ? {
          ...prev.profile,
          ...data.profile,
          id: prev.profile.id,
        } : prev.profile,
      };
    });
  };

  const handleAvatarChange = (avatar?: string) => {
    setDraftUser(prev =>
      prev ? { ...prev, profile: { ...prev.profile, avatar } } : prev,
    );
  };

  const handleUpdate = async () => {
    if (!pageUser || !draftUser) return;

    try {
      const nameChanged =
        pageUser.profile.firstName !== draftUser.profile.firstName ||
        pageUser.profile.lastName !== draftUser.profile.lastName;

      if (nameChanged) {
        await updateProfile({
          variables: {
            profile: {
              userId: pageUser.id,
              first_name: draftUser.profile.firstName,
              last_name: draftUser.profile.lastName,
            },
          },
        });
      }

      const orgChanged =
        pageUser.department !== draftUser.department ||
        pageUser.position !== draftUser.position;

      if (orgChanged) {
        await updateUser({
          variables: {
            user: {
              userId: pageUser.id,
              departmentId: draftUser.department || null,
              positionId: draftUser.position || null,
            },
          },
        });
      }

      await refetch();
    } catch (error) {
      setErrorMsg('Error updating profile. Please try again.');
    }
  };

  const isLoading = userLoading || authLoading;
  const isSaving = profileLoading || userUpdating;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!draftUser || !pageUser) return null;

  return (
    <Box sx={pageContainerSx}>
      <UserProfileHeader
        user={draftUser}
        canEdit={canEdit}
        onAvatarChange={handleAvatarChange}
      />

      <Box sx={formWrapperSx}>
        <ProfileForm
          user={draftUser}
          departments={departments}
          positions={positions}
          onChange={handleProfileChange}
          readOnly={!canEdit}
          isAdmin={isAdmin}
          isOwnProfile={currentUser?.id === pageUser?.id} 
        />
      </Box>

      {canEdit && (
        <Box sx={actionsWrapperSx}>
          <Button
            disabled={!isChanged || isSaving}
            onClick={handleUpdate}
            sx={updateButtonSx(isChanged)}
          >
            {isSaving ? 'SAVING...' : 'UPDATE'}
          </Button>
        </Box>
      )}

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={() => setErrorMsg(null)}
          sx={{ width: '100%' }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}