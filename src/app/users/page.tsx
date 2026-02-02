'use client';

import { useState } from 'react';
import { Box } from '@mui/material';

import { SearchInput } from '@/features/search-users/ui/SearchInput';
import { useSession } from '@/entities/session/model/useSession';
import { EmployeesHeader } from '../widgets/users-header/ui/EmployeesHeader';
import { CreateUserButton } from '@/features/admin-users/ui/CreateUserButton';
import { AdminUsersTable } from '../widgets/users-table/admin/AdminUsersTable';
import { UserUsersTable } from '../widgets/users-table/user/UserUsersTable';


export default function UsersPage() {
  const [search, setSearch] = useState('');
  const { user } = useSession();

  return (
    <>
      <EmployeesHeader />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <SearchInput value={search} onChange={setSearch} />

        {user.role === 'ADMIN' && (
          <CreateUserButton
            onClick={() => {
              console.log('open create user modal');
            }}
          />
        )}
      </Box>

      {user.role === 'ADMIN' ? (
        <AdminUsersTable search={search} />
      ) : (
        <UserUsersTable search={search} />
      )}
    </>
  );
}
