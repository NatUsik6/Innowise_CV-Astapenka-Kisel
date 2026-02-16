import { gql } from '@apollo/client';

export const GET_CV = gql`
  query GetCv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        id
      }
    }
  }
`;

export const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;