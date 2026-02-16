import { gql } from '@apollo/client';

export const GET_PROFILE_LANGUAGES = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      id
      created_at
      iso2
      name
      native_name
    }
  }
`;