import { SxProps, Theme } from '@mui/material/styles';

export const tableContainerSx: SxProps<Theme> = {
  backgroundColor: '#353535',
  border: 'none',
  boxShadow: 'none',
};

export const headCellSx: SxProps<Theme> = {
  color: '#bdbdbd',
  borderBottom: '1px solid rgba(146,146,146,0.7)',
  fontSize: 13,
};

export const bodyCellSx: SxProps<Theme> = {
  color: '#fff',
  borderBottom: '1px solid rgba(146,146,146,0.7)',
  fontSize: 14,
};

export const sortableCellSx: SxProps<Theme> = {
  ...headCellSx,
  cursor: 'pointer',
};

export const tableRowSx: SxProps<Theme> = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
};
