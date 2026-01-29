import { useState } from 'react';
import { User } from '@/entities/user/model/types';
import { mockUsers } from '@/entities/user/model/mock';

export const useUpdateUser = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    closeModal();
  };

  return {
    open,
    user: selectedUser,
    users,
    openModal,
    closeModal,
    updateUser,
  };
};
