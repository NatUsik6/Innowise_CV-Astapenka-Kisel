import { gql } from '@apollo/client';
import { UpdateProfileInput } from '../model/types';
import { USERS_QUERY } from './useUsers';
import { useMutation } from '@apollo/client/react';

type UpdateProfileArgs = {
  profile: UpdateProfileInput;
};

type UpdateProfileResult = {
  updateProfile: {
    first_name: string;
    last_name: string;
    full_name: string;
  };
};

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      first_name
      last_name
      full_name
    }
  }
`;

export function useUpdateProfile() {
  return useMutation<UpdateProfileResult, UpdateProfileArgs>(UPDATE_PROFILE, {
    refetchQueries: [{ query: USERS_QUERY }],
    awaitRefetchQueries: true,
  });
}
