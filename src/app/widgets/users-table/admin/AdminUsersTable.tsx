'use client';

import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { UsersTable } from '../ui/UsersTable';
import { User } from '@/entities/user/model/types';
import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';
import { DeleteUserModal } from '@/features/delete-user/ui/DeleteUserModal';
import { mockUsers } from '@/entities/user/model/mock';

export const AdminUsersTable = ({
  search,
}: {
  search: string;
}) => {
  const [users, setUsers] =
    useState<User[]>(mockUsers);

  const [menuEl, setMenuEl] =
    useState<HTMLElement | null>(null);

  const [activeUser, setActiveUser] =
    useState<User | null>(null);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

  const openMenu = Boolean(menuEl);

  const closeMenu = () => {
    setMenuEl(null);
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
        onSubmit={updated =>
          setUsers(prev =>
            prev.map(u =>
              u.id === updated.id ? updated : u
            )
          )
        }
      />

      <DeleteUserModal
        open={openDelete}
        user={activeUser}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          setUsers(prev =>
            prev.filter(
              u => u.id !== activeUser?.id
            )
          );
          setOpenDelete(false);
        }}
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
