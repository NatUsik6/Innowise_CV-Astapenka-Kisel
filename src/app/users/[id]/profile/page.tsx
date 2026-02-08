'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useParams } from 'next/navigation';
import { currentUserMock } from '@/entities/auth/model/mock';

import { ProfileForm } from '@/features/update-profile/ui/ProfileForm';
import { UserProfileHeader } from '@/widgets/user-profile/ui/UserProfileHeader';

import {
  pageContainerSx,
  formWrapperSx,
  actionsWrapperSx,
  updateButtonSx,
} from './ProfilePage.styles';
import { User } from '@/entities/user/model/types';
import { getDepartmentsMock, getPositionsMock, getUserMock } from '@/entities/user/api/mock';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();

  const [savedUser, setSavedUser] =
    useState<User | null>(null);
  const [draftUser, setDraftUser] =
    useState<User | null>(null);

  const [departments, setDepartments] =
    useState<string[]>([]);
  const [positions, setPositions] =
    useState<string[]>([]);

  useEffect(() => {
    getUserMock(id).then(user => {
      setSavedUser(user);
      setDraftUser(user);
    });

    setDepartments(getDepartmentsMock());
    setPositions(getPositionsMock());
  }, [id]);

  const canEditProfile =
    currentUserMock.role === 'ADMIN' ||
    currentUserMock.id === savedUser?.id;

  const isChanged = useMemo(() => {
    if (!savedUser || !draftUser) return false;

    return (
      savedUser.profile.firstName !==
        draftUser.profile.firstName ||
      savedUser.profile.lastName !==
        draftUser.profile.lastName ||
      savedUser.department_name !==
        draftUser.department_name ||
      savedUser.position_name !==
        draftUser.position_name ||
      savedUser.profile.avatar !==
        draftUser.profile.avatar
    );
  }, [savedUser, draftUser]);

  const handleProfileChange = (
    data: Partial<User>
  ) => {
    setDraftUser(prev =>
      prev ? { ...prev, ...data } : prev
    );
  };

  const handleAvatarChange = (
    avatar?: string
  ) => {
    setDraftUser(prev =>
      prev
        ? {
            ...prev,
            profile: {
              ...prev.profile,
              avatar,
            },
          }
        : prev
    );
  };

  const handleUpdate = () => {
    if (!savedUser || !draftUser) return;
    setSavedUser(draftUser);
  };

  if (!savedUser || !draftUser) return null;

  return (
    <Box sx={pageContainerSx}>
      <UserProfileHeader
        user={draftUser}
        onAvatarChange={handleAvatarChange}
      />

      <Box sx={formWrapperSx}>
        <ProfileForm
          user={draftUser}
          departments={departments}
          positions={positions}
          onChange={handleProfileChange}
          readOnly={!canEditProfile}
        />
      </Box>

      {canEditProfile && (
        <Box sx={actionsWrapperSx}>
          <Button
            disabled={!isChanged}
            onClick={handleUpdate}
            sx={updateButtonSx(isChanged)}
          >
            UPDATE
          </Button>
        </Box>
      )}
    </Box>
  );
}
