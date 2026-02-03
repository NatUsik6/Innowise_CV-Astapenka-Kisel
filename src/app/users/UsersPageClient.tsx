'use client';

import { useState, useCallback } from 'react';

import { SearchInput } from '@/features/search-users/ui/SearchInput';
import { CreateUserButton } from '@/features/admin-users/ui/CreateUserButton';
import { useSession } from '@/entities/session/model/useSession';
import { UserRole } from '@/entities/user/model/roles';

import { AdminUsersTable } from '../widgets/users-table/admin/AdminUsersTable';
import { UserUsersTable } from '../widgets/users-table/user/UserUsersTable';

import { Toolbar } from './UsersPageClient.styles';

export const UsersPageClient = () => {
  const { user } = useSession();

  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleOpenCreate = useCallback(() => {
    setCreateModalOpen(true);
  }, []);

  const handleCloseCreate = useCallback(() => {
    setCreateModalOpen(false);
  }, []);

  const handleUserCreated = useCallback(() => {
    setCreateModalOpen(false);
  }, []);

  return (
    <>
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} />

        {user.role === UserRole.ADMIN && (
          <CreateUserButton onClick={handleOpenCreate} />
        )}
      </Toolbar>

      {user.role === UserRole.ADMIN ? (
        <AdminUsersTable
          search={search}
          createModalOpen={createModalOpen}
          onCloseCreateModal={handleCloseCreate}
          onUserCreated={handleUserCreated}
        />
      ) : (
        <UserUsersTable search={search} />
      )}
    </>
  );
};
