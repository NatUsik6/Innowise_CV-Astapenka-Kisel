'use client';

import { styled } from '@mui/material/styles';
import { IconButton, MenuItem } from '@mui/material';

export const ActionsButton = styled(IconButton)({
  color: '#bdbdbd',
});

export const MenuItemBase = styled(MenuItem)({
  color: '#fff',
  fontSize: 14,
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '10px',
  paddingBottom: '10px',

  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
});

export const DeleteMenuItem = styled(MenuItemBase)({
  color: '#e53935',
});
