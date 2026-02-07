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

// временно, не приходят с api
const MOCK_POSITIONS: Position[] = [
  { id: '1', name: 'Frontend Developer', created_at: new Date().toISOString() },
  { id: '2', name: 'Backend Developer', created_at: new Date().toISOString() },
  { id: '3', name: 'UI/UX Designer', created_at: new Date().toISOString() },
  { id: '4', name: 'Product Manager', created_at: new Date().toISOString() },
  { id: '5', name: 'DevOps Engineer', created_at: new Date().toISOString() },
  { id: '6', name: 'QA Engineer', created_at: new Date().toISOString() },
];

export function usePositions() {
  const { data, loading, error } = useQuery<PositionsResult>(POSITIONS_QUERY, {
    ssr: false,
  });

  const shouldUseMock = !loading && (!data?.positions || data.positions.length === 0 || error);

  return {
    positions: shouldUseMock ? MOCK_POSITIONS : (data?.positions || []),
    loading,
    error: shouldUseMock ? null : error, 
  };
}
