'use client';

import { Box, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { AvatarUploader } from '@/app/features/upload-avatar/ui/AvatarUploader';
import { User } from '@/app/entities/user/model/types';

interface Props {
  user: User;
}

const formatDate = (date: string) =>
  new Date(date).toDateString();

export const UserProfileHeader = ({ user }: Props) => {
  return (
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
        <AvatarUploader
          avatar={user.profile.avatar}
          userId={user.id}
          canEdit
        />

        <Box display="flex" gap={1.5} alignItems="center" justifyContent="center">
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
      </Box>

      <Box textAlign="center" mt={3}>
        <Typography variant="h5">
          {user.profile.firstName} {user.profile.lastName}
        </Typography>

        <Typography color="rgba(255,255,255,0.7)">
          {user.email}
        </Typography>

        <Typography color="rgba(255,255,255,0.5)">
          A member since {formatDate(user.created_at)}
        </Typography>
      </Box>
    </Box>
  );
};
