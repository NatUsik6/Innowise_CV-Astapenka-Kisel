import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { UserAPI } from '../model/types';
import { mapUserFromAPI } from '../model/mapper';

type UserResult = {
  user: UserAPI;
};

export const USER_QUERY = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      role
      profile {
        id
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

export function useUser(userId: string) {
  const { data, loading, error, refetch } = useQuery<UserResult>(USER_QUERY, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: 'cache-and-network',
  });

  return {
    user: data?.user ? mapUserFromAPI(data.user) : null,
    loading,
    error,
    refetch,
  };
}
