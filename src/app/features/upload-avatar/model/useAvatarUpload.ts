'use client';

import { deleteAvatarMock, uploadAvatarMock } from '@/app/entities/user/api/avatar.mock';
import { useState } from 'react';


const MAX_SIZE = 500 * 1024;
const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
];

interface UseAvatarUploadParams {
  onSuccess: (avatar?: string) => void;
}

export const useAvatarUpload = ({
  onSuccess,
}: UseAvatarUploadParams) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Unsupported file format. Use png, jpg or gif.';
    }

    if (file.size > MAX_SIZE) {
      return 'File size must be less than 500 KB.';
    }

    return null;
  };

  const upload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const url = await uploadAvatarMock(file);
      onSuccess(url);
    } catch {
      setError('Failed to upload avatar.');
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      setLoading(true);
      await deleteAvatarMock();
      onSuccess(undefined);
    } catch {
      setError('Failed to delete avatar.');
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return {
    upload,
    remove,
    error,
    loading,
    resetError,
  };
};
