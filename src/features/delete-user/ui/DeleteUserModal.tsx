'use client';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

import { User } from '@/entities/user/model/types';

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteUserModal = ({
  open,
  user,
  onClose,
  onConfirm,
}: Props) => {
  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(53,53,53,1)',
          color: '#fff',
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle>Delete user</DialogTitle>

      <Typography sx={{ px: 3, pb: 2 }}>
        Are you sure you want to delete{' '}
        <b>
          {user.firstName} {user.lastName}
        </b>
        ?
      </Typography>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#bdbdbd',
            borderColor: '#bdbdbd',
            borderRadius: '30px',
            width: 150,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: '#e53935',
            color: '#fff',
            borderRadius: '30px',
            width: 150,
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
