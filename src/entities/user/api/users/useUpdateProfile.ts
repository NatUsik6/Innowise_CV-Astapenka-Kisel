import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { USERS_QUERY } from './useUsers';
import { USER_QUERY } from '../useUser';

type UpdateProfileArgs = {
  profile: {
    userId: string;
    first_name?: string | null;
    last_name?: string | null;
  };
};

type UpdateProfileResult = {
  updateProfile: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
  };
};

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
      full_name
    }
  }
`;

export function useUpdateProfile(userId: string) {
  return useMutation<UpdateProfileResult, UpdateProfileArgs>(UPDATE_PROFILE, {
    refetchQueries: [
      { query: USERS_QUERY },
      { query: USER_QUERY, variables: { userId } }
    ],
    awaitRefetchQueries: true,
  });
}