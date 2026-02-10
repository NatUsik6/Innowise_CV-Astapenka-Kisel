import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { USERS_QUERY } from './useUsers';

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