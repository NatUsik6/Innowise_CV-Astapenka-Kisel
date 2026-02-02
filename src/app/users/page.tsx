'use client';

import { useState } from 'react';
import { Box } from '@mui/material';

import { SearchInput } from '@/features/search-users/ui/SearchInput';
import { useSession } from '@/entities/session/model/useSession';
import { CreateUserButton } from '@/features/admin-users/ui/CreateUserButton';

import { EmployeesHeader } from '../widgets/users-header/ui/EmployeesHeader';
import { AdminUsersTable } from '../widgets/users-table/admin/AdminUsersTable';
import { UserUsersTable } from '../widgets/users-table/user/UserUsersTable';

export default function UsersPage() {
  const { user } = useSession();
  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleOpenCreate = () => {
    setCreateModalOpen(true);
  };

  const handleUserCreated = () => {
    setCreateModalOpen(false);
  };

  return (
    <>
      <EmployeesHeader />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <SearchInput value={search} onChange={setSearch} />

        {user.role === 'ADMIN' && (
          <CreateUserButton onClick={handleOpenCreate} />
        )}
      </Box>

      {user.role === 'ADMIN' ? (
        <AdminUsersTable 
          search={search}
          createModalOpen={createModalOpen}
          onCloseCreateModal={() => setCreateModalOpen(false)}
          onUserCreated={handleUserCreated}
        />
      ) : (
        <UserUsersTable search={search} />
      )}
    </>
  );
}