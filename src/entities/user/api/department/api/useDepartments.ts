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

export function useDepartments() {
  const { data, loading, error } = useQuery<DepartmentsResult>(DEPARTMENTS_QUERY, {
    fetchPolicy: 'cache-first',
  });

  return {
    departments: data?.departments || [],
    loading,
    error,
  };
}