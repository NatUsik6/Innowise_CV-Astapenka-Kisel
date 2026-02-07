// глянуть
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { User, UpdateUserInput, UpdateProfileInput } from '@/entities/user/model/types';
import { StyledTextField } from '@/shared/ui/inputs/StyledTextField';
import { StyledSelect } from '@/shared/ui/inputs/StyledSelect';
import { useDepartments } from '@/entities/user/api/department/api/useDepartments';
import { usePositions } from '@/entities/user/api/position/api/usePositions';
import { useUpdateUser } from '@/entities/user/api/useUpdateUser';
import { useUpdateProfile } from '@/entities/user/api/useUpdateProfile';

import {
  dialogPaperSx,
  dialogTitleSx,
  closeIconSx,
  formGridSx,
  dialogActionsSx,
  cancelButtonSx,
  updateButtonSx,
} from './UpdateUserModal.styles';

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit?: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  role: 'Admin' | 'Employee';
};

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  departmentId: '',
  positionId: '',
  role: 'Employee',
};

export const UpdateUserModal = ({
  open,
  user,
  onClose,
  onSubmit,
}: Props) => {
  const { departments, loading: depsLoading } = useDepartments();
  const { positions, loading: posLoading } = usePositions();
  const [updateUser, { loading: updatingUser }] = useUpdateUser();
  const [updateProfile, { loading: updatingProfile }] = useUpdateProfile();

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [isDirty, setIsDirty] = useState(false);
  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (user && open) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        departmentId: user.department || '',
        positionId: user.position || '',
        role: user.role,
      });
      setIsDirty(false);
    } else {
      setForm(EMPTY_FORM);
      setIsDirty(false);
    }
  }, [user, open]);

  if (!user) return null;

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const updating = updatingUser || updatingProfile;
  const isActive = isDirty && !updating;

  const handleSubmit = async () => {
    if (!user) return;

    try {
      if (
        form.firstName !== user.firstName ||
        form.lastName !== user.lastName
      ) {
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
          userInput.departmentId = form.departmentId || undefined;
        }

        if (form.positionId !== user.position) {
          userInput.positionId = form.positionId || undefined;
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
      setAlertMessage(err instanceof Error ? err.message : 'Failed to update user');
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
          <Box sx={formGridSx}>
            <StyledTextField
              label="First Name"
              value={form.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
            />

            <StyledTextField
              label="Last Name"
              value={form.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
            />

            <StyledSelect
              label="Department"
              value={form.departmentId}
              onChange={e => handleChange('departmentId', e.target.value)}
              disabled={depsLoading}
            >
              <MenuItem value="">None</MenuItem>
              {departments.map(dep => (
                <MenuItem key={dep.id} value={dep.id}>
                  {dep.name}
                </MenuItem>
              ))}
            </StyledSelect>

            <StyledSelect
              label="Position"
              value={form.positionId}
              onChange={e => handleChange('positionId', e.target.value)}
              disabled={posLoading}
            >
              <MenuItem value="">None</MenuItem>
              {positions.map(pos => (
                <MenuItem key={pos.id} value={pos.id}>
                  {pos.name}
                </MenuItem>
              ))}
            </StyledSelect>

            <StyledTextField
              label="Email"
              value={user.email}
              disabled
            />

            <StyledSelect
              label="Role"
              value={form.role}
              onChange={e => handleChange('role', e.target.value as 'Admin' | 'Employee')}
            >
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </StyledSelect>
          </Box>
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

      <Snackbar
        open={!!alertMessage}
        autoHideDuration={4000}
        onClose={() => setAlertMessage('')}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity={alertSeverity}
          onClose={() => setAlertMessage('')}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};