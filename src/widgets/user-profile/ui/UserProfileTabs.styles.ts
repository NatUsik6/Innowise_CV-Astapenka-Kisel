import { SxProps, Theme } from '@mui/material';

export const tabsRootSx: SxProps<Theme> = {
  mt: 1,

  '& .MuiTabs-indicator': {
    backgroundColor: '#E53935',
    height: 2,
  },
};

export const tabItemSx: SxProps<Theme> = {
  color: '#fff',
  fontWeight: 500,
  fontSize: 14,
  width: 150,
  '&.Mui-selected': {
    color: '#E53935',
  },
};
