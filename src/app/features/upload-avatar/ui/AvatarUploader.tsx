'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  avatar?: string;
  canEdit: boolean;
  onDropFile?: (file: File) => void;
}

export const AvatarUploader = ({
  avatar,
  canEdit,
  onDropFile,
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
      sx={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        bgcolor: '#555',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: canEdit ? 'pointer' : 'default',
        outline: isDragging
          ? '2px dashed #E53935'
          : 'none',
        outlineOffset: 2,
        transition: 'outline 0.15s ease',
      }}
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
          R
        </Typography>
      )}
    </Box>
  );
};
