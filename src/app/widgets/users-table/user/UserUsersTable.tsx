'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from 'next/navigation';

import { mockUsers } from '@/entities/user/model/mock';
import { User } from '@/entities/user/model/types';
import { UsersTable } from '../ui/UsersTable';

import { useUpdateUser } from '@/features/update-user/model/useUpdateUser';
import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';

import { actionButtonSx } from './UserUsersTable.styles';

export const UserUsersTable = ({
  search,
}: {
  search: string;
}) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const currentUserId = '1'; // TODO: временно

  const router = useRouter();

  const {
    open,
    user,
    openModal,
    closeModal,
    updateUser,
  } = useUpdateUser();

  const handleUpdate = (updatedUser: User) => {
    setUsers(previousUsers =>
      previousUsers.map(user => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      })
    );

    updateUser(updatedUser);
  };


  return (
    <>
      <UsersTable
        users={users}
        search={search}
        renderActions={(user) =>
          user.id === currentUserId ? (
            <IconButton
              sx={actionButtonSx}
              onClick={(e) => {
                e.stopPropagation();
                openModal(user);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={actionButtonSx}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/users/${user.id}/profile`);
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          )
        }
      />

      <UpdateUserModal
        open={open}
        user={user}
        onClose={closeModal}
        onSubmit={handleUpdate}
      />
    </>
  );
};
