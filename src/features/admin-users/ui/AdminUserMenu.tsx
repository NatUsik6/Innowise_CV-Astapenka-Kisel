'use client';

import { Menu, MenuItem } from '@mui/material';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export const AdminUserMenu = ({
  anchorEl,
  onClose,
  onUpdate,
  onDelete,
}: Props) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#2f2f2f',
          color: '#fff',
        },
      }}
    >
      <MenuItem
        onClick={() => {
          onUpdate();
          onClose();
        }}
      >
        Update user
      </MenuItem>

      <MenuItem
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        Delete user
      </MenuItem>
    </Menu>
  );
};
