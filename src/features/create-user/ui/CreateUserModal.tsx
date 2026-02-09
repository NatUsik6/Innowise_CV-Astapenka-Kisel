'use client';

import { useState, useEffect, useRef } from 'react';
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

interface GraphQLError {
  message: string;
  extensions?: {
    response?: {
      message?: string | string[];
    };
  };
}

interface ErrorWithGraphQL extends Error {
  graphQLErrors?: GraphQLError[];
}

export const CreateUserModal = ({ open, onClose, onSubmit }: Props) => {
  const [createUser, { loading: creating }] = useCreateUser();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const wasOpen = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
    control,
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      departmentId: undefined,
      positionId: undefined,
      role: 'Employee',
    },
  });

  const password = watch('password');

  useEffect(() => {
    if (open && !wasOpen.current) {
      reset({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        departmentId: undefined,
        positionId: undefined,
        role: 'Employee',
      });
    }
    wasOpen.current = open;
  }, [open, reset]);

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
      departmentId: (data.departmentId && data.departmentId !== '') ? data.departmentId : null,
      positionId: (data.positionId && data.positionId !== '') ? data.positionId : null,
    };

    try {
      await createUser({
        variables: { user: input },
      });
      
      setAlertMessage('User created successfully');
      setAlertSeverity('success');
      onClose();
      onSubmit?.();
    } catch (err) {
      let errorMessage = 'Failed to create user';
      
      if (err instanceof Error) {
        const graphQLError = (err as ErrorWithGraphQL).graphQLErrors?.[0];
        
        if (graphQLError) {
          const response = graphQLError.extensions?.response;
          if (response?.message) {
            const messages = response.message;
            errorMessage = Array.isArray(messages) ? messages.join(', ') : messages;
          } else {
            errorMessage = graphQLError.message || err.message;
          }
        } else {
          errorMessage = err.message;
        }
      }
      
      setAlertMessage(errorMessage);
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
              control={control}
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