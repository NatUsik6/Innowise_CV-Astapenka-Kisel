import { SxProps, Theme } from '@mui/material/styles';

export const gridLayoutSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 40px',
  px: 2,
};

export const tableContainerSx: SxProps<Theme> = {
  mt: 2,
  backgroundColor: '#353535', 
  borderRadius: '4px',
  overflow: 'hidden',
};

export const combinedHeadCellSx: SxProps<Theme> = {
  ...gridLayoutSx,
  color: '#FFFFFF', 
  borderBottom: '1px solid rgba(146,146,146,0.7)',
  fontSize: '14px', 
  py: 2,
  fontWeight: 500,
  '& .MuiTypography-root': {
    fontSize: 'inherit',
    color: 'inherit',
    fontWeight: 'inherit',
  },
};

export const sortableHeaderCellSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '3.69px',
  color: '#FFFFFF',
  '&:hover': {
    opacity: 0.8,
  },
};

export const arrowSx: SxProps<Theme> = {
  color: '#FFFFFFB2',
  fontSize: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  lineHeight: 1,
  transform: 'translateY(-1px)',
};

export const rowWrapperSx: SxProps<Theme> = {
  borderBottom: '1px solid rgba(146,146,146,0.7)',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
  },
};

export const rowDataGridSx: SxProps<Theme> = {
  ...gridLayoutSx,
  alignItems: 'center',
  py: 2,
};

export const dataTextSx: SxProps<Theme> = {
  color: '#fff',
  fontSize: 14,
};

export const descriptionTextSx: SxProps<Theme> = {
  mt: 0.5,
  px: 2,
  pb: 2,
  color: '#bdbdbd',
  fontSize: 14,
  lineHeight: 1.6,
  maxWidth: 'calc(100% - 60px)',
  wordBreak: 'break-word',
};

export const actionButtonSx: SxProps<Theme> = {
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
};