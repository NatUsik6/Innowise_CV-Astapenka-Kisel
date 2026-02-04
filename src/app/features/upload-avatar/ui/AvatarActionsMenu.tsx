'use client';

import { Menu, MenuItem } from '@mui/material';

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  canDelete: boolean;
}

export const AvatarActionsMenu = ({
  anchorEl,
  open,
  onClose,
  onUpdate,
  onDelete,
  canDelete,
}: Props) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          mt: 1,
          bgcolor: '#1E1E1E',
          borderRadius: 2,
          minWidth: 220,
        },
      }}
    >
      <MenuItem
        onClick={() => {
          onUpdate();
          onClose();
        }}
        sx={menuItemSx}
      >
        Update avatar
      </MenuItem>

      {canDelete && (
        <MenuItem
          onClick={() => {
            onDelete();
            onClose();
          }}
          sx={{
            ...menuItemSx,
            color: '#E53935',
          }}
        >
          Delete avatar
        </MenuItem>
      )}
    </Menu>
  );
};

const menuItemSx = {
  fontSize: 14,
  color: '#fff',

  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
};
