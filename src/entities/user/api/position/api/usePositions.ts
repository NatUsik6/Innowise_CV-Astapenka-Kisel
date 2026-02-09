import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export interface Position {
  id: string;
  created_at: string;
  name: string;
}

type PositionsResult = {
  positions: Position[];
};

export const POSITIONS_QUERY = gql`
  query Positions {
    positions {
      id
      name
      created_at
    }
  }
`;

export function usePositions() {
  const { data, loading, error } = useQuery<PositionsResult>(POSITIONS_QUERY, {
    fetchPolicy: 'cache-first',
  });

  return {
    positions: data?.positions || [],
    loading,
    error,
  };
}