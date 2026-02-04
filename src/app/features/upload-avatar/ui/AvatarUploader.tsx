'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { avatarBoxSx } from './AvatarUploader.styles';

interface Props {
  avatar?: string;
  canEdit: boolean;
  onDropFile?: (file: File) => void;
  fallback?: string;
}

export const AvatarUploader = ({
  avatar,
  canEdit,
  onDropFile,
  fallback,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    if (!canEdit) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!canEdit) return;
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && onDropFile) {
      onDropFile(file);
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={avatarBoxSx(canEdit, isDragging)}
    >
      {avatar ? (
        <Image
          src={avatar}
          alt="avatar"
          width={120}
          height={120}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Typography variant="h4">
          {fallback ?? 'U'}
        </Typography>
      )}
    </Box>
  );
};
