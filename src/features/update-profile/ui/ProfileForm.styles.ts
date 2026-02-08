import { SxProps, Theme } from '@mui/material';

export const formGridSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 2,
};

export const menuItemSx: SxProps<Theme> = {
  color: '#fff',
  fontSize: 14,

  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  '&.Mui-selected': {
    backgroundColor: 'rgba(255,255,255,0.12)',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.16)',
    },
  },
};
