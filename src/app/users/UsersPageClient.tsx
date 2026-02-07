'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { SearchInput } from '@/features/search-users/ui/SearchInput';
import { CreateUserButton } from '@/features/admin-users/ui/CreateUserButton';
import { useSession } from '@/entities/session/model/useSession';

import { AdminUsersTable } from '../widgets/users-table/admin/AdminUsersTable';
import { UserUsersTable } from '../widgets/users-table/user/UserUsersTable';

import { Toolbar } from './UsersPageClient.styles';
import { StatusText } from '@/shared/ui/StatusText/StatusText.styles';

export const UsersPageClient = () => {
  const router = useRouter();
  const { user, loading } = useSession();

  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user && mounted) {
      router.push('/login');
    }
  }, [user, loading, mounted, router]);

  const handleOpenCreate = useCallback(() => {
    setCreateModalOpen(true);
  }, []);

  const handleCloseCreate = useCallback(() => {
    setCreateModalOpen(false);
  }, []);

  if (!mounted || loading) {
    return <StatusText>Loading...</StatusText>;
  }

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'Admin';

  return (
    <>
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} />

        {isAdmin && (
          <CreateUserButton onClick={handleOpenCreate} />
        )}
      </Toolbar>

      {isAdmin ? (
        <AdminUsersTable
          search={search}
          createModalOpen={createModalOpen}
          onCloseCreateModal={handleCloseCreate}
        />
      ) : (
        <UserUsersTable search={search} />
      )}
    </>
  );
};