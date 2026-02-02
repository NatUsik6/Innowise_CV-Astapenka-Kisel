'use client';

import {
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

const borderColor = 'rgba(146,146,146,0.7)';
const bgColor = 'rgba(53,53,53,1)';
const textColor = '#fff';
const dangerColor = '#e53935';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export const UserActionsMenu = ({
  onEdit,
  onDelete,
}: Props) => {
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{ color: '#bdbdbd' }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={e => e.stopPropagation()}
        PaperProps={{
          sx: {
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
            minWidth: 160,

            '& .MuiMenuItem-root': {
              color: textColor,
              fontSize: 14,

              '&:hover': {
                backgroundColor:
                  'rgba(146,146,146,0.15)',
              },
            },
          },
        }}
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
          onClick={() => {
            onDelete();
            handleClose();
          }}
          sx={{ color: dangerColor }}
        >
          Delete user
        </MenuItem>
      </Menu>
    </>
  );
};
