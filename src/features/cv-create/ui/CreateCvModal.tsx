'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateCv } from '@/entities/cv/api/useCreateCv';
import { createCvSchema, CreateCvFormValues } from '../model/createCvSchema';
import { CreateCvForm } from './CreateCvForm';
import { ActionSnackbar } from '@/shared/ui/users/ActionSnackbar/ActionSnackbar';
import { cancelButtonSx, closeIconSx, createButtonSx, dialogActionsSx, dialogPaperSx, dialogTitleSx, formGridSx } from './CreateCvModal.styles';

interface Props {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export const CreateCvModal = ({ open, onClose, userId }: Props) => {
  const [createCv, { loading: creating }] = useCreateCv();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const wasOpen = useRef(false);

  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<CreateCvFormValues>({
    resolver: zodResolver(createCvSchema),
    defaultValues: { name: '', education: '', description: '' },
  });

  useEffect(() => {
    if (open && !wasOpen.current) {
      reset({ name: '', education: '', description: '' });
    }
    wasOpen.current = open;
  }, [open, reset]);

  const submitHandler = async (data: CreateCvFormValues) => {
    try {
      await createCv({
        variables: { 
          cv: { ...data, userId } 
        },
      });
      
      setAlertMessage('CV created successfully');
      setAlertSeverity('success');
      onClose();
    } catch (err) {
      setAlertMessage(err instanceof Error ? err.message : 'Failed to create CV');
      setAlertSeverity('error');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: dialogPaperSx }}>
        <DialogTitle sx={dialogTitleSx}>
          Create CV
          <IconButton onClick={onClose} sx={closeIconSx}><CloseIcon /></IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogContent>
            <CreateCvForm register={register} errors={errors} formGridSx={formGridSx} />
          </DialogContent>

          <DialogActions sx={dialogActionsSx}>
            <Button onClick={onClose} variant="outlined" sx={cancelButtonSx}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={!isDirty || creating}
              sx={createButtonSx(isDirty && !creating)}
            >
              {creating ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ActionSnackbar 
        message={alertMessage} 
        severity={alertSeverity} 
        onClose={() => setAlertMessage('')} 
      />
    </>
  );
};