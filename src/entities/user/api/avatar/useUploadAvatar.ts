import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

type UploadAvatarArgs = {
  avatar: {
    userId: string;
    base64: string;
    size: number;
    type: string;
  };
};

type UploadAvatarResult = {
  uploadAvatar: string;
};

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export function useUploadAvatar() {
  return useMutation<UploadAvatarResult, UploadAvatarArgs>(UPLOAD_AVATAR);
}