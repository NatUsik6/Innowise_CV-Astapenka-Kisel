import { SxProps, Theme } from '@mui/material';

export const dialogPaperSx: SxProps<Theme> = {
  backgroundColor: '#353535',
  color: '#fff',
  borderRadius: '12px',
  backgroundImage: 'none',
  width: '100%',
  maxWidth: '600px',
};

export const dialogTitleSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '1.25rem',
  fontWeight: 600,
  p: '24px 24px 16px',
};

export const closeIconSx: SxProps<Theme> = {
  color: '#fff',
};

export const formGridSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  mt: 1,
};

export const textFieldSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e53935',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.5)',
    '&.Mui-focused': {
      color: '#e53935',
    },
  },
};

export const dialogActionsSx: SxProps<Theme> = {
  p: '16px 24px 24px',
  gap: 2,
  justifyContent: 'center',
};

export const cancelButtonSx: SxProps<Theme> = {
  color: '#fff',
  borderColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  padding: '8px 32px',
  textTransform: 'none',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};

export const createButtonSx = (active: boolean): SxProps<Theme> => ({
  backgroundColor: active ? '#c62828' : 'rgba(255, 255, 255, 0.1)',
  color: active ? '#fff' : 'rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  padding: '8px 32px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: active ? '#b71c1c' : 'rgba(255, 255, 255, 0.1)',
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(255, 255, 255, 0.2)',
  },
});

export const deleteButtonSx: SxProps<Theme> = {
  backgroundColor: '#c62828',
  color: '#fff',
  borderRadius: '24px',
  padding: '10px 40px',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#b71c1c',
  },
};

export const deleteDialogPaperSx: SxProps<Theme> = {
  ...dialogPaperSx,
  maxWidth: '440px',
};