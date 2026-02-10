import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { USER_QUERY } from '../useUser';

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

export function useDeleteAvatar(userId: string) {
  return useMutation<void, DeleteAvatarArgs>(DELETE_AVATAR, {
    refetchQueries: [
      { query: USER_QUERY, variables: { userId } },
    ],
    awaitRefetchQueries: true,
  });
}