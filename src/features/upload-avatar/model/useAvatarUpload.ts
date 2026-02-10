import { useDeleteAvatar } from '@/entities/user/api/avatar/useDeleteAvatar';
import { useUploadAvatar } from '@/entities/user/api/avatar/useUploadAvatar';
import { useState } from 'react';


const MAX_SIZE = 500 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

interface UseAvatarUploadParams {
  userId: string;
  onSuccess: (avatar?: string) => void;
}

const validateFile = (file: File): string | null => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Unsupported file format. Use png, jpg or gif.';
  }
  if (file.size > MAX_SIZE) {
    return 'File size must be less than 500 KB.';
  }
  return null;
};

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
  });

export const useAvatarUpload = ({ userId, onSuccess }: UseAvatarUploadParams) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [uploadAvatarMutation] = useUploadAvatar(userId);
  const [deleteAvatarMutation] = useDeleteAvatar(userId);

  const upload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const base64 = await toBase64(file);
      const { data } = await uploadAvatarMutation({
        variables: {
          avatar: {
            userId,
            base64,
            size: file.size,
            type: file.type,
          },
        },
      });
      onSuccess(data?.uploadAvatar);
    } catch {
      setError('Failed to upload avatar.');
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      setLoading(true);
      await deleteAvatarMutation({
        variables: {
          avatar: { userId },
        },
      });
      onSuccess(undefined);
    } catch {
      setError('Failed to delete avatar.');
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { upload, remove, error, loading, resetError };
};