import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

type DeleteAvatarArgs = {
  avatar: {
    userId: string;
  };
};

const DELETE_AVATAR = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;

export function useDeleteAvatar() {
  return useMutation<void, DeleteAvatarArgs>(DELETE_AVATAR);
}