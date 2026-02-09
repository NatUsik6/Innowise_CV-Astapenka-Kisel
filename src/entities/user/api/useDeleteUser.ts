import { gql } from '@apollo/client';
import { USERS_QUERY } from './useUsers';
import { useMutation } from '@apollo/client/react';

type DeleteUserArgs = {
  userId: string;
};

type DeleteUserResult = {
  deleteUser: {
    affected: number;
  };
};

const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      affected
    }
  }
`;

export function useDeleteUser() {
  return useMutation<DeleteUserResult, DeleteUserArgs>(DELETE_USER, {
    refetchQueries: [{ query: USERS_QUERY }],
    awaitRefetchQueries: true,
  });
}