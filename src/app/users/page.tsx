'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';

import { USERS_QUERY } from '@/entities/user/model/queries';
import { User } from '@/entities/user/model/types';

import { UsersHeader } from '@/widgets/users/UsersHeader/UsersHeader';
import { UsersTable } from '@/widgets/users/UsersTable/UsersTable';

type UsersQueryResponse = {
  users: User[];
};

export default function UsersPage() {
  const role: 'admin' | 'user' = 'admin'; // потом из auth
  const currentUserId = '1';

  const { data, loading, error } =
    useQuery<UsersQueryResponse>(USERS_QUERY);

  const [search, setSearch] = useState('');

  if (loading) return <div>Loading...</div>;

  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  const users = data?.users ?? [];

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      `${u.profile.first_name} ${u.profile.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <>
      <UsersHeader
        role={role}
        search={search}
        onSearchChange={setSearch}
      />

      <UsersTable
        users={filteredUsers}
        role={role}
        currentUserId={currentUserId}
      />
    </>
  );
}
