'use client';

import { useState } from 'react';

import { User } from '@/entities/user/model/types';
import { UsersTable } from '../ui/UsersTable';
import { useSession } from '@/entities/session/model/useSession';
import { useUsers } from '@/entities/user/api/useUsers';
import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';
import { StatusText } from '@/shared/ui/users/StatusText/StatusText.styles';

import { UserActions } from './UserActions';

export const UserUsersTable = ({ search }: { search: string }) => {
  const { user: currentUser } = useSession();
  const { users, loading, error } = useUsers();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleUpdate = () => {
    closeModal();
  };

  if (loading) {
    return <StatusText>Loading...</StatusText>;
  }

  if (error) {
    return (
      <StatusText color="#ff5252">
        Error: {error.message}
      </StatusText>
    );
  }

  if (!currentUser) {
    return <StatusText>No authorization</StatusText>;
  }

  return (
    <>
      <UsersTable
        users={users || []}
        search={search}
        renderActions={(user) => (
          <UserActions
            user={user}
            currentUserId={currentUser.id}
            onEdit={openModal}
          />
        )}
      />

      <UpdateUserModal
        open={open}
        user={selectedUser}
        onClose={closeModal}
        onSubmit={handleUpdate}
      />
    </>
  );
};
