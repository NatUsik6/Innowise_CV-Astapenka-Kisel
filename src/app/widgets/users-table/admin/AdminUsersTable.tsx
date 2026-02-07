'use client';

import { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

import { UsersTable } from '../ui/UsersTable';
import { User } from '@/entities/user/model/types';
import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';
import { DeleteUserModal } from '@/features/delete-user/ui/DeleteUserModal';
import { CreateUserModal } from '@/features/create-user/ui/CreateUserModal';

import { useUsers } from '@/entities/user/api/useUsers';
import { useDeleteUser } from '@/entities/user/api/useDeleteUser';

import { StatusText } from '@/shared/ui/users/StatusText/StatusText.styles';
import { AdminUserActions } from './AdminUserActions';

interface Props {
  search: string;
  createModalOpen: boolean;
  onCloseCreateModal: () => void;
}

export const AdminUsersTable = ({
  search,
  createModalOpen,
  onCloseCreateModal,
}: Props) => {
  const { users, loading, error } = useUsers();
  const [deleteUser] = useDeleteUser();

  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const handleUpdateUser = useCallback(() => {
    setOpenUpdate(false);
  }, []);

  const handleDeleteUser = useCallback(async () => {
    if (!activeUser) return;

    try {
      await deleteUser({
        variables: { userId: activeUser.id },
      });
      setAlertMessage('User deleted successfully');
      setAlertSeverity('success');
      setOpenDelete(false);
    } catch (err) {
      setAlertMessage(err instanceof Error ? err.message : 'Failed to delete user');
      setAlertSeverity('error');
    }
  }, [activeUser, deleteUser]);

  const handleCreateUser = useCallback(() => {
    onCloseCreateModal();
  }, [onCloseCreateModal]);

  if (loading) {
    return <StatusText>Loading...</StatusText>;
  }

  if (error) {
    return (
      <StatusText color="#ff5252">
        Error loading users: {error.message}
      </StatusText>
    );
  }

  if (!users || users.length === 0) {
    return <StatusText>No users found</StatusText>;
  }

  return (
    <>
      <UsersTable
        users={users}
        search={search}
        renderActions={(user) => (
          <AdminUserActions
            user={user}
            onUpdate={(u) => {
              setActiveUser(u);
              setOpenUpdate(true);
            }}
            onDelete={(u) => {
              setActiveUser(u);
              setOpenDelete(true);
            }}
          />
        )}
      />

      <UpdateUserModal
        open={openUpdate}
        user={activeUser}
        onClose={() => setOpenUpdate(false)}
        onSubmit={handleUpdateUser}
      />

      <DeleteUserModal
        open={openDelete}
        user={activeUser}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteUser}
      />

      <CreateUserModal
        open={createModalOpen}
        onClose={onCloseCreateModal}
        onSubmit={handleCreateUser}
      />

      <Snackbar
        open={!!alertMessage}
        autoHideDuration={4000}
        onClose={() => setAlertMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={alertSeverity}
          onClose={() => setAlertMessage('')}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
