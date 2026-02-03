'use client';

import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
  iconButtonSx,
  menuPaperSx,
  dangerItemSx,
} from './UserActionsMenu.styles';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export const UserActionsMenu = ({ onEdit, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={iconButtonSx}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={e => e.stopPropagation()}
        PaperProps={{ sx: menuPaperSx }}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleClose();
          }}
        >
          Update user
        </MenuItem>

        <MenuItem
          sx={dangerItemSx}
          onClick={() => {
            onDelete();
            handleClose();
          }}
        >
          Delete user
        </MenuItem>
      </Menu>
    </>
  );
};
