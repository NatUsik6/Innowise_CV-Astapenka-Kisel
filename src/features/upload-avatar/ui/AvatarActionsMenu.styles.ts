import { SxProps, Theme } from '@mui/material';

export const menuPaperSx: SxProps<Theme> = {
  mt: 1,
  bgcolor: '#1E1E1E',
  borderRadius: 2,
  minWidth: 220,
};

export const menuItemSx: SxProps<Theme> = {
  fontSize: 14,
  color: '#fff',

  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
};

export const deleteMenuItemSx: SxProps<Theme> = {
  ...menuItemSx,
  color: '#E53935',
};
