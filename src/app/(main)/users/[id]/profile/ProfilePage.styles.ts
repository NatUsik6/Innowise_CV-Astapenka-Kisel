import { SxProps, Theme } from '@mui/material';

export const pageContainerSx: SxProps<Theme> = {
  maxWidth: 900,
  mx: 'auto',
  mt: 6,
};

export const formWrapperSx: SxProps<Theme> = {
  mt: 6,
};

export const actionsWrapperSx: SxProps<Theme> = {
  mt: 5,
  display: 'flex',
  justifyContent: 'flex-end',
};

export const updateButtonSx = (
  isChanged: boolean
): SxProps<Theme> => ({
  width: 440,
  height: 44,
  borderRadius: 22,
  fontWeight: 600,
  backgroundColor: isChanged
    ? '#E53935'
    : 'rgba(255,255,255,0.15)',
  color: isChanged
    ? '#fff'
    : 'rgba(255,255,255,0.4)',
});
