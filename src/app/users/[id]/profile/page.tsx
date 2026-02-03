'use client';

import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useParams } from 'next/navigation';

import { User } from '@/app/entities/user/model/types';
import {
  getDepartmentsMock,
  getPositionsMock,
  getUserMock,
} from '@/app/entities/user/api/mock';
import { ProfileForm } from '@/app/features/update-profile/ui/ProfileForm';

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;

    getUserMock(userId).then(setUser);
    setDepartments(getDepartmentsMock());
    setPositions(getPositionsMock());
  }, [userId]);

  if (!user) return null;

  const handleChange = (data: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <Box maxWidth={900} mx="auto" mt={6}>
      <ProfileForm
        user={user}
        departments={departments}
        positions={positions}
        onChange={handleChange}
      />

      <Box mt={5} display="flex" justifyContent="flex-end">
        <Button
          disabled
          sx={{
            width: 440,
            height: 44,
            borderRadius: 22,
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
          }}
        >
          UPDATE
        </Button>
      </Box>
    </Box>
  );
}
