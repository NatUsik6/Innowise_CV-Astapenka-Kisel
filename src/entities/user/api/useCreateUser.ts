import { gql } from '@apollo/client';
import { CreateUserInput, UserAPI } from '../model/types';
import { USERS_QUERY } from './useUsers';
import { useMutation } from '@apollo/client/react';

type CreateUserArgs = {
  user: CreateUserInput;
};

type CreateUserResult = {
  createUser: UserAPI;
};

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
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

export function useCreateUser() {
  return useMutation<CreateUserResult, CreateUserArgs>(CREATE_USER, {
    refetchQueries: [{ query: USERS_QUERY }],
    awaitRefetchQueries: true,
    update(cache, { data }) {
      if (data?.createUser) {
        cache.evict({ fieldName: 'users' });
        cache.gc();
      }
    },
  });
}