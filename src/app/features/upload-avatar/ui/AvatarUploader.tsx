'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
  avatar?: string;
  userId: string;
  canEdit: boolean;
}

export const AvatarUploader = ({ avatar, canEdit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = () => {
    if (canEdit) inputRef.current?.click();
  };

  return (
    <Box
      onClick={onPick}
      sx={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        bgcolor: '#555',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: canEdit ? 'pointer' : 'default',
      }}
    >
      {avatar ? (
        <Image src={avatar} alt="avatar" width={120} height={120} />
      ) : (
        <Typography variant="h4">R</Typography>
      )}
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/png,image/jpeg,image/jpg,image/gif"
      />
    </Box>
  );
};
