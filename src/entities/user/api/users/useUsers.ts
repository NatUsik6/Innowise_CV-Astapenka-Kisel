import { gql } from '@apollo/client';
import { UserAPI } from '../../model/types';
import { mapUsersFromAPI } from '../../model/mapper';
import { useQuery } from '@apollo/client/react';

type UsersResult = {
  users: UserAPI[];
};

export const USERS_QUERY = gql`
  query Users {
    users {
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

export function useUsers() {
  const { data, loading, error, refetch } = useQuery<UsersResult>(USERS_QUERY, {
    fetchPolicy: 'network-only', 
  });

  return {
    users: data?.users ? mapUsersFromAPI(data.users) : undefined,
    loading,
    error,
    refetch,
  };
}
