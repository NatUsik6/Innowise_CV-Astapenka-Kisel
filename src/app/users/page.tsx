'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { SearchInput } from '@/features/search-users/ui/SearchInput';
import { useSession } from '@/entities/session/model/useSession';
import { CreateUserButton } from '@/features/admin-users/ui/CreateUserButton';
import { User } from '@/entities/user/model/types';
import { EmployeesHeader } from '../widgets/users-header/ui/EmployeesHeader';
import { AdminUsersTable } from '../widgets/users-table/admin/AdminUsersTable';
import { UserUsersTable } from '../widgets/users-table/user/UserUsersTable';
import { CreateUserModal } from '@/features/create-user/ui/CreateUserModal';

export default function UsersPage() {
  const { user } = useSession();
  const [search, setSearch] = useState('');
  const [openCreate, setOpenCreate] = useState(false);

  const handleCreate = (newUser: User & { password: string }) => {
    console.log('CREATE USER', newUser);
    setOpenCreate(false); 
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
          <CreateUserButton onClick={() => setOpenCreate(true)} />
        )}
      </Box>

      {user.role === 'ADMIN' ? (
        <AdminUsersTable search={search} />
      ) : (
        <UserUsersTable search={search} />
      )}

      <CreateUserModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />
    </>
  );
}