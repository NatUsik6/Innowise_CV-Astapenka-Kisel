'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteCv } from '@/entities/cv/api/useDeleteCv';
import { 
  dialogTitleSx, closeIconSx, 
  dialogActionsSx, cancelButtonSx,
  deleteDialogPaperSx,
  deleteButtonSx
} from '@/features/cv-create/ui/CreateCvModal.styles';

interface Props {
  open: boolean;
  onClose: () => void;
  cvId: string;
  cvName: string;
}

export const DeleteCvModal = ({ open, onClose, cvId, cvName }: Props) => {
  const [deleteCv, { loading }] = useDeleteCv();

  const handleDelete = async () => {
    try {
      await deleteCv({ 
        variables: { cv: { cvId } } 
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: deleteDialogPaperSx }}>
      <DialogTitle sx={dialogTitleSx}>
        Delete CV
        <IconButton onClick={onClose} sx={closeIconSx}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', mt: 1 }}>
          Are you sure you want to delete CV <strong>{cvName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ ...dialogActionsSx, justifyContent: 'center', pb: 3 }}>
        <Button onClick={onClose} variant="outlined" sx={cancelButtonSx}>
          CANCEL
        </Button>
        <Button 
          onClick={handleDelete} 
          disabled={loading}
          sx={deleteButtonSx}
        >
          {loading ? 'DELETING...' : 'CONFIRM'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};