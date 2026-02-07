import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export interface Department {
  id: string;
  created_at: string;
  name: string;
}

type DepartmentsResult = {
  departments: Department[];
};

export const DEPARTMENTS_QUERY = gql`
  query Departments {
    departments {
      id
      name
      created_at
    }
  }
`;

// временно, не приходят с api
const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Engineering', created_at: new Date().toISOString() },
  { id: '2', name: 'Design', created_at: new Date().toISOString() },
  { id: '3', name: 'Marketing', created_at: new Date().toISOString() },
  { id: '4', name: 'Sales', created_at: new Date().toISOString() },
  { id: '5', name: 'HR', created_at: new Date().toISOString() },
];

export function useDepartments() {
  const { data, loading, error } = useQuery<DepartmentsResult>(DEPARTMENTS_QUERY, {
    ssr: false,
  });

  const shouldUseMock = !loading && (!data?.departments || data.departments.length === 0 || error);

  return {
    departments: shouldUseMock ? MOCK_DEPARTMENTS : (data?.departments || []),
    loading,
    error: shouldUseMock ? null : error, 
  };
}
