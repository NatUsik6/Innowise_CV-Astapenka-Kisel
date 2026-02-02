'use client';

import { useState } from 'react';
import { IconButton, Menu, MenuItem, } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { UsersTable } from '../ui/UsersTable';
import { User } from '@/entities/user/model/types';
import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';
import { DeleteUserModal } from '@/features/delete-user/ui/DeleteUserModal';
import { CreateUserModal } from '@/features/create-user/ui/CreateUserModal';
import { mockUsers } from '@/entities/user/model/mock';

interface Props {
  search: string;
  onUserCreated?: (user: User & { password: string }) => void;
  createModalOpen?: boolean;
  onCloseCreateModal?: () => void;
}

export const AdminUsersTable = ({
  search,
  onUserCreated,
  createModalOpen,
  onCloseCreateModal,
}: Props) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [internalOpenCreate, setInternalOpenCreate] = useState(false);
  const isCreateModalControlled = createModalOpen !== undefined;
  const openCreate = isCreateModalControlled ? createModalOpen : internalOpenCreate;

  const openMenu = Boolean(menuEl);
  const closeMenu = () => {
    setMenuEl(null);
  };

  const handleUpdateUser = (updated: User & { password?: string }) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === updated.id ? updated : u
      )
    );
    setOpenUpdate(false);
  };

  const handleDeleteUser = () => {
    if (!activeUser) return;

    setUsers(prev =>
      prev.filter(u => u.id !== activeUser.id)
    );

    setOpenDelete(false);
  };
  const handleCreateUser = (newUser: User & { password: string }) => {
    const userToAdd = {
      ...newUser,
      id: crypto.randomUUID(),
    };

    setUsers(prev => [...prev, userToAdd]);

    if (isCreateModalControlled && onCloseCreateModal) {
      onCloseCreateModal();
    } else {
      setInternalOpenCreate(false);
    }

    if (onUserCreated) {
      onUserCreated(newUser);
    }
  };

  const handleCloseCreateModal = () => {
    if (isCreateModalControlled && onCloseCreateModal) {
      onCloseCreateModal();
    } else {
      setInternalOpenCreate(false);
    }
  };

  const renderActions = (user: User) => (
    <>
      <IconButton
        sx={{ color: '#bdbdbd' }}
        onClick={e => {
          setMenuEl(e.currentTarget);
          setActiveUser(user);
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={menuEl}
        open={openMenu}
        onClose={closeMenu}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(53,53,53,1)',
            border: '1px solid rgba(146,146,146,0.7)',
            borderRadius: 2,
            mt: 1,
            minWidth: 160,
          },
        }}
      >
        <MenuItem
          sx={menuItem}
          onClick={() => {
            closeMenu();
            setOpenUpdate(true);
          }}
        >
          Update user
        </MenuItem>

        <MenuItem
          sx={{ ...menuItem, color: '#e53935' }}
          onClick={() => {
            closeMenu();
            setOpenDelete(true);
          }}
        >
          Delete user
        </MenuItem>
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
        open={openCreate}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateUser}
      />
    </>
  );
};

const menuItem = {
  color: '#fff',
  fontSize: 14,
  px: 2,
  py: 1.2,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
};