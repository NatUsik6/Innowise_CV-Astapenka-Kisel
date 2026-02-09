import { gql } from '@apollo/client';
import { UpdateUserInput, UserAPI } from '../model/types';
import { USERS_QUERY } from './useUsers';
import { useMutation } from '@apollo/client/react';

type UpdateUserArgs = {
  user: UpdateUserInput;
};

type UpdateUserResult = {
  updateUser: UserAPI;
};

const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      email
      role
      profile {
        first_name
        last_name
        full_name
        avatar
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

export function useUpdateUser() {
  return useMutation<UpdateUserResult, UpdateUserArgs>(UPDATE_USER, {
    refetchQueries: [{ query: USERS_QUERY }],
    awaitRefetchQueries: true,
    update(cache, { data }) {
      if (data?.updateUser) {
        cache.evict({ fieldName: 'users' });
        cache.gc();
      }
    },
  });
}