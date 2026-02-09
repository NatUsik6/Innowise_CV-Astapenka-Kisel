'use client';

import { Snackbar, Alert } from '@mui/material';

interface Props {
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

export const ActionSnackbar = ({ message, severity, onClose }: Props) => {
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
