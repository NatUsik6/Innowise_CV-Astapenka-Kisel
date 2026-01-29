import { useMemo, useState } from 'react';
import { User } from '@/entities/user/model/types';

type SortField = 'department' | null;
type SortOrder = 'asc' | 'desc';

export const useUsersTable = (users: User[], search: string) => {
  const [sortField, setSortField] = useState<SortField>('department');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (search) {
      const value = search.toLowerCase();
      result = result.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(value)
      );
    }

    if (sortField) {
      result.sort((a, b) => {
        const aValue = a.department_name.toLowerCase();
        const bValue = b.department_name.toLowerCase();

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, search, sortField, sortOrder]);

  const toggleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return {
    users: filteredUsers,
    sortOrder,
    toggleSort,
  };
};
