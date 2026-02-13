import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

const GET_CV = gql`
  query GetCv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      user {
        id
      }
    }
  }
`;

interface CvResult {
    cv: {
        id: string;
        user?: {
            id: string;
        } | null;
    };
}

interface UseCvProps {
    cvId: string;
}

export const useCv = ({ cvId }: UseCvProps) => {
    const { data, loading, error } = useQuery<CvResult>(GET_CV, {
        variables: { cvId },
    });

    return {
        cv: data?.cv,
        loading,
        error,
    };
};
