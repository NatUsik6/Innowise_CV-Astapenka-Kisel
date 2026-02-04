'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useParams } from 'next/navigation';

import { User } from '@/app/entities/user/model/types';
import {
  getDepartmentsMock,
  getPositionsMock,
  getUserMock,
} from '@/app/entities/user/api/mock';
import { currentUserMock } from '@/app/entities/auth/model/mock';

import { ProfileForm } from '@/app/features/update-profile/ui/ProfileForm';
import { UserProfileHeader } from '@/widgets/user-profile/ui/UserProfileHeader';

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
    <Box maxWidth={900} mx="auto" mt={6}>
      <UserProfileHeader
        user={draftUser}
        onAvatarChange={handleAvatarChange}
      />

      <Box mt={6}>
        <ProfileForm
          user={draftUser}
          departments={departments}
          positions={positions}
          onChange={handleProfileChange}
          readOnly={!canEditProfile}
        />
      </Box>

      {canEditProfile && (
        <Box
          mt={5}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            disabled={!isChanged}
            onClick={handleUpdate}
            sx={{
              width: 440,
              height: 44,
              borderRadius: 22,
              fontWeight: 600,
              backgroundColor: isChanged
                ? '#E53935'
                : 'rgba(255,255,255,0.15)',
              color: isChanged
                ? '#fff'
                : 'rgba(255,255,255,0.4)',
            }}
          >
            UPDATE
          </Button>
        </Box>
      )}
    </Box>
  );
}
