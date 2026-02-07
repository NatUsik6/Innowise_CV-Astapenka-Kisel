'use client';

import { useState, useCallback } from 'react';
import { Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { User } from '@/entities/user/model/types';
import {
  ActionsButton,
  MenuItemBase,
  DeleteMenuItem,
  menuPaperSx,
} from './AdminUsersTable.styles';

interface Props {
  user: User;
  onUpdate: (user: User) => void;
  onDelete: (user: User) => void;
}

export const AdminUserActions = ({ user, onUpdate, onDelete }: Props) => {
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);

  const closeMenu = useCallback(() => {
    setMenuEl(null);
  }, []);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMenuEl(e.currentTarget);
  };

  return (
    <>
      <ActionsButton onClick={openMenu}>
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
            onUpdate(user);
          }}
        >
          Update user
        </MenuItemBase>

        <DeleteMenuItem
          onClick={() => {
            closeMenu();
            onDelete(user);
          }}
        >
          Delete user
        </DeleteMenuItem>
      </Menu>
    </>
  );
};
