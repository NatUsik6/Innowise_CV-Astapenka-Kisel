import { SxProps, Theme } from '@mui/material';

export const tabsRootSx: SxProps<Theme> = {
  mt: 4,

  '& .MuiTabs-indicator': {
    backgroundColor: '#E53935',
    height: 2,
  },
};

export const tabItemSx: SxProps<Theme> = {
  color: '#fff',
  fontWeight: 500,

  '&.Mui-selected': {
    color: '#E53935',
  },
};
