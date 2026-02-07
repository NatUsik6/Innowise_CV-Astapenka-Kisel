'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { CreateUserInput } from '@/entities/user/model/types';
import { createUserSchema } from '../model/createUserSchema';
import { useCreateUser } from '@/entities/user/api/useCreateUser';
import { ActionSnackbar } from '@/shared/ui/users/ActionSnackbar/ActionSnackbar';
import { CreateUserForm, CreateUserFormValues } from './CreateUserForm';

import {
  dialogPaperSx,
  dialogTitleSx,
  closeIconSx,
  formGridSx,
  dialogActionsSx,
  cancelButtonSx,
  createButtonSx,
} from './CreateUserModal.styles';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export const CreateUserModal = ({ open, onClose, onSubmit }: Props) => {
  const [createUser, { loading: creating }] = useCreateUser();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      departmentId: '',
      positionId: '',
      role: 'Employee',
    },
  });

  const password = watch('password');

  const submitHandler = async (data: CreateUserFormValues) => {
    const input: CreateUserInput = {
      auth: {
        email: data.email,
        password: data.password,
      },
      profile: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
      role: data.role,
      cvsIds: [],
      departmentId: data.departmentId || undefined,
      positionId: data.positionId || undefined,
    };

    try {
      await createUser({
        variables: { user: input },
      });

      setAlertMessage('User created successfully');
      setAlertSeverity('success');
      reset();
      onClose();
      onSubmit?.();
    } catch (err) {
      setAlertMessage(err instanceof Error ? err.message : 'Failed to create user');
      setAlertSeverity('error');
    }
  };

  const isCreateActive = isDirty && !!password && !creating;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: dialogPaperSx }}
      >
        <DialogTitle sx={dialogTitleSx}>
          Create user
          <IconButton onClick={onClose} sx={closeIconSx}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogContent>
            <CreateUserForm
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
              formGridSx={formGridSx}
            />
          </DialogContent>

          <DialogActions sx={dialogActionsSx}>
            <Button onClick={onClose} variant="outlined" sx={cancelButtonSx}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={!isCreateActive}
              sx={createButtonSx(isCreateActive)}
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
