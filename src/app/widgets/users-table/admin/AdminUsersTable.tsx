'use client';

import { useState, useCallback } from 'react';
import { Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { UsersTable } from '../ui/UsersTable';
import { User } from '@/entities/user/model/types';
import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';
import { DeleteUserModal } from '@/features/delete-user/ui/DeleteUserModal';
import { CreateUserModal } from '@/features/create-user/ui/CreateUserModal';
import { mockUsers } from '@/entities/user/model/mock';

import {
  ActionsButton,
  MenuItemBase,
  DeleteMenuItem,
  menuPaperSx,
} from './AdminUsersTable.styles';

interface Props {
  search: string;
  createModalOpen: boolean;
  onCloseCreateModal: () => void;
  onUserCreated: (user: User & { password: string }) => void;
}

export const AdminUsersTable = ({
  search,
  createModalOpen,
  onCloseCreateModal,
  onUserCreated,
}: Props) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuEl(null);
  }, []);

  const handleOpenMenu = useCallback(
    (user: User) => (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setMenuEl(e.currentTarget);
      setActiveUser(user);
    },
    []
  );

  const handleUpdateUser = useCallback(
    (updated: User & { password?: string }) => {
      setUsers(prev =>
        prev.map(u => (u.id === updated.id ? updated : u))
      );
      setOpenUpdate(false);
    },
    []
  );

  const handleDeleteUser = useCallback(() => {
    if (!activeUser) return;

    setUsers(prev =>
      prev.filter(u => u.id !== activeUser.id)
    );
    setOpenDelete(false);
  }, [activeUser]);

  const handleCreateUser = useCallback(
    (newUser: User & { password: string }) => {
      setUsers(prev => [...prev, newUser]);
      onCloseCreateModal();
      onUserCreated(newUser);
    },
    [onCloseCreateModal, onUserCreated]
  );

  const renderActions = (user: User) => (
    <>
      <ActionsButton onClick={handleOpenMenu(user)}>
        <MoreVertIcon />
      </ActionsButton>

      <Menu
        anchorEl={menuEl}
        open={Boolean(menuEl)}
        onClose={closeMenu}
        PaperProps={{ sx: menuPaperSx }}
      >
        <MenuItemBase
          onClick={() => {
            closeMenu();
            setOpenUpdate(true);
          }}
        >
          Update user
        </MenuItemBase>

        <DeleteMenuItem
          onClick={() => {
            closeMenu();
            setOpenDelete(true);
          }}
        >
          Delete user
        </DeleteMenuItem>
      </Menu>
    </>
  );

  return (
    <>
      <UsersTable
        users={users}
        search={search}
        renderActions={renderActions}
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
    </>
  );
};
