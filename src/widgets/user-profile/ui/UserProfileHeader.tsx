'use client';

import {
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useRef, useState } from 'react';
import { User } from '@/app/entities/user/model/types';
import { currentUserMock } from '@/app/entities/auth/model/mock';
import { useAvatarUpload } from '@/app/features/upload-avatar/model/useAvatarUpload';
import { AvatarUploader } from '@/app/features/upload-avatar/ui/AvatarUploader';
import { AvatarActionsMenu } from '@/app/features/upload-avatar/ui/AvatarActionsMenu';


interface Props {
  user: User;
  onAvatarChange: (avatar?: string) => void;
}

const formatDate = (date: string) =>
  new Date(date).toDateString();

export const UserProfileHeader = ({
  user,
  onAvatarChange,
}: Props) => {
  const currentUser = currentUserMock;

  const canEdit =
    currentUser.id === user.id ||
    currentUser.role === 'ADMIN';

  const inputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] =
    useState<HTMLElement | null>(null);

  const {
    upload,
    remove,
    error,
    resetError,
  } = useAvatarUpload({
    onSuccess: onAvatarChange,
  });

  const openMenu = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (!canEdit) return;
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  const handlePick = () => {
    inputRef.current?.click();
    closeMenu();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    upload(file);
  };

  return (
    <>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Box onClick={openMenu}>
            <AvatarUploader
              avatar={user.profile.avatar}
              canEdit={canEdit}
              onDropFile={upload}
            />
          </Box>

          {canEdit && (
            <Box
              display="flex"
              gap={1.5}
              alignItems="center"
              sx={{ cursor: 'pointer' }}
              onClick={openMenu}
            >
              <UploadIcon sx={{ mt: 0.3 }} />

              <Box>
                <Typography fontWeight={500}>
                  Upload avatar image
                </Typography>
                <Typography
                  fontSize={12}
                  color="rgba(255,255,255,0.6)"
                >
                  png, jpg or gif no more than 0.5MB
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="h5">
            {user.profile.firstName}{' '}
            {user.profile.lastName}
          </Typography>

          <Typography color="rgba(255,255,255,0.7)">
            {user.email}
          </Typography>

          <Typography color="rgba(255,255,255,0.5)">
            A member since{' '}
            {formatDate(user.created_at)}
          </Typography>
        </Box>
      </Box>

      {canEdit && (
        <AvatarActionsMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          onUpdate={handlePick}
          onDelete={remove}
          canDelete={!!user.profile.avatar}
        />
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/png,image/jpeg,image/jpg,image/gif"
        onChange={handleInputChange}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={resetError}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity="error"
          onClose={resetError}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
