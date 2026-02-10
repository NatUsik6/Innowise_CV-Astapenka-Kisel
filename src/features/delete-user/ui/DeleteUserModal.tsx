'use client';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

import { User } from '@/entities/user/model/types';
import {
  dialogPaperSx,
  textSx,
  dialogActionsSx,
  cancelButtonSx,
  confirmButtonSx,
} from './DeleteUserModal.styles';

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
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: dialogPaperSx }}>
      <DialogTitle>Delete user</DialogTitle>

      <Typography sx={textSx}>
        Are you sure you want to delete{' '}
        <b>
          {user.profile.firstName} {user.profile.lastName}
        </b>
        ?
      </Typography>

      <DialogActions sx={dialogActionsSx}>
        <Button onClick={onClose} variant="outlined" sx={cancelButtonSx}>
          Cancel
        </Button>

        <Button onClick={onConfirm} variant="contained" sx={confirmButtonSx}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
