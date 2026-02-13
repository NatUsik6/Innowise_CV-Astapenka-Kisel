import { useMemo, useState } from 'react';
import { User } from '@/entities/user/model/types';

export type SortField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'department'
  | 'position'
  | null;

export type SortOrder = 'asc' | 'desc';

export const useUsersTable = (
  users: User[] | undefined,
  search: string
) => {
  const [sortField, setSortField] =
    useState<SortField>(null);

  const [sortOrder, setSortOrder] =
    useState<SortOrder>('asc');

  const filteredUsers = useMemo(() => {
    const safeUsers = Array.isArray(users)
      ? users
      : [];

    let result = [...safeUsers];

    if (search) {
      const value = search.toLowerCase().trim();

      result = result.filter(user =>
        `${user.profile.firstName || ''} ${user.profile.lastName || ''}`
          .toLowerCase()
          .includes(value)
      );
    }

    if (sortField) {
      result.sort((a, b) => {
        const getValue = (u: User): string => {
          switch (sortField) {
            case 'firstName':
              return u.profile.firstName || '';
            case 'lastName':
              return u.profile.lastName || '';
            case 'email':
              return u.email || '';
            case 'department':
              return u.department_name || '';
            case 'position':
              return u.position_name || '';
            default:
              return '';
          }
        };

        const aValue = getValue(a).toLowerCase();
        const bValue = getValue(b).toLowerCase();

        if (aValue < bValue)
          return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue)
          return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, search, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(prev =>
        prev === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    users: filteredUsers,
    sortField,
    sortOrder,
    handleSort,
  };
};