'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { User, UpdateUserInput, UpdateProfileInput, UpdateUserFormData } from '@/entities/user/model/types';
import { ActionSnackbar } from '@/shared/ui/users/ActionSnackbar/ActionSnackbar';
import { UpdateUserForm } from './UpdateUserForm';

import {
  dialogPaperSx,
  dialogTitleSx,
  closeIconSx,
  formGridSx,
  dialogActionsSx,
  cancelButtonSx,
  updateButtonSx,
} from './UpdateUserModal.styles';
import { useUpdateUser } from '@/entities/user/api/users/useUpdateUser';
import { useUpdateProfile } from '@/entities/user/api/users/useUpdateProfile';

interface Props {
  open: boolean;
  user: User | null;
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

const EMPTY_FORM: UpdateUserFormData = {
  firstName: '',
  lastName: '',
  departmentId: undefined,
  positionId: undefined,
  role: 'Employee',
  email: '',
};

export const UpdateUserModal = ({ open, user, onClose, onSubmit }: Props) => {
  const [updateUser, { loading: updatingUser }] = useUpdateUser();
  const [updateProfile, { loading: updatingProfile }] = useUpdateProfile(user?.id || '');

  const [form, setForm] = useState<UpdateUserFormData>(EMPTY_FORM);
  const [isDirty, setIsDirty] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (user && open) {
      setForm({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        departmentId: user.department || undefined,
        positionId: user.position || undefined,
        role: user.role,
        email: user.email || '',
      });
      setIsDirty(false);
    } else {
      setForm(EMPTY_FORM);
      setIsDirty(false);
    }
  }, [user, open]);

  if (!user) return null;

  const handleChange = (field: keyof UpdateUserFormData, value: string | undefined) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const updating = updatingUser || updatingProfile;
  const isActive = isDirty && !updating;

  const handleSubmit = async () => {
    if (!user) return;

    try {
      if (form.firstName !== user.profile.firstName || form.lastName !== user.profile.lastName) {
        const profileInput: UpdateProfileInput = {
          userId: user.id,
          first_name: form.firstName,
          last_name: form.lastName,
        };

        await updateProfile({
          variables: { profile: profileInput },
        });
      }

      const needsUserUpdate =
        form.role !== user.role ||
        form.departmentId !== user.department ||
        form.positionId !== user.position;

      if (needsUserUpdate) {
        const userInput: UpdateUserInput = {
          userId: user.id,
        };

        if (form.role !== user.role) {
          userInput.role = form.role;
        }

        if (form.departmentId !== user.department) {
          userInput.departmentId = (form.departmentId && form.departmentId !== '') 
            ? form.departmentId 
            : null;
        }

        if (form.positionId !== user.position) {
          userInput.positionId = (form.positionId && form.positionId !== '') 
            ? form.positionId 
            : null;
        }

        await updateUser({
          variables: { user: userInput },
        });
      }

      setAlertMessage('User updated successfully');
      setAlertSeverity('success');
      onClose();
      onSubmit?.();
    } catch (err) {
      let errorMessage = 'Failed to update user';
      
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
          Update user
          <IconButton onClick={onClose} sx={closeIconSx}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <UpdateUserForm
            user={user}
            formData={form}
            onChange={handleChange}
            formGridSx={formGridSx}
          />
        </DialogContent>

        <DialogActions sx={dialogActionsSx}>
          <Button onClick={onClose} variant="outlined" sx={cancelButtonSx}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!isActive}
            sx={updateButtonSx(isActive)}
          >
            {updating ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      <ActionSnackbar
        message={alertMessage}
        severity={alertSeverity}
        onClose={() => setAlertMessage('')}
      />
    </>
  );
};