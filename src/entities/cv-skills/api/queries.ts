import { gql } from '@apollo/client';

export const GET_CV_SKILLS = gql`
  query GetCv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;
