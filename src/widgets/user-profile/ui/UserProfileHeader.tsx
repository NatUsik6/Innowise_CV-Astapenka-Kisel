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

import {
  headerRootSx,
  avatarRowSx,
  uploadHintSx,
  uploadIconSx,
  textCenterSx,
  emailTextSx,
  dateTextSx,
} from './UserProfileHeader.styles';

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

  const handleAvatarClick = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (!canEdit) return;

    if (!user.profile.avatar) {
      inputRef.current?.click();
      return;
    }

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
      <Box sx={headerRootSx}>
        <Box sx={avatarRowSx}>
          <Box onClick={handleAvatarClick}>
            <AvatarUploader
              avatar={user.profile.avatar}
              canEdit={canEdit}
              onDropFile={upload}
            />
          </Box>

          {canEdit && (
            <Box
              sx={uploadHintSx}
              onClick={handleAvatarClick}
            >
              <UploadIcon sx={uploadIconSx} />

              <Box>
                <Typography fontWeight={500}>
                  Upload avatar image
                </Typography>
                <Typography fontSize={12}>
                  png, jpg or gif no more than 0.5MB
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box sx={textCenterSx}>
          <Typography variant="h5">
            {user.profile.firstName}{' '}
            {user.profile.lastName}
          </Typography>

          <Typography sx={emailTextSx}>
            {user.email}
          </Typography>

          <Typography sx={dateTextSx}>
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
