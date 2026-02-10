import { SxProps, Theme } from '@mui/material';

export const headerRootSx: SxProps<Theme> = {
  mt: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const avatarRowSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
};

export const uploadHintSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
  alignItems: 'center',
  cursor: 'pointer',
};

export const uploadIconSx: SxProps<Theme> = {
  mt: 0.3,
};

export const textCenterSx: SxProps<Theme> = {
  textAlign: 'center',
  mt: 3,
};

export const emailTextSx: SxProps<Theme> = {
  color: 'rgba(255,255,255,0.7)',
};

export const dateTextSx: SxProps<Theme> = {
  color: 'rgba(255,255,255,0.5)',
};
