import { SxProps, Theme } from "@mui/material";

export const formContainerSx = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  width: '100%',
  maxWidth: 900,
  mx: 'auto',
  pt: 4,
  px: 2,
};

export const submitWrapperSx = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const loaderSx = {
  color: 'rgba(255,255,255,0.6)',
};

export const updateButtonSx = (
  isChanged: boolean
) => ({
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
