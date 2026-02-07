// глянуть
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
  Box,
  IconButton,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { CreateUserInput } from '@/entities/user/model/types';
import { createUserSchema } from '../model/createUserSchema';
import { StyledTextField } from '@/shared/ui/inputs/StyledTextField';
import { StyledSelect } from '@/shared/ui/inputs/StyledSelect';
import { useDepartments } from '@/entities/user/api/department/api/useDepartments';
import { usePositions } from '@/entities/user/api/position/api/usePositions';
import { useCreateUser } from '@/entities/user/api/useCreateUser';

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

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId?: string;
  positionId?: string;
  role: 'Admin' | 'Employee';
};

export const CreateUserModal = ({
  open,
  onClose,
  onSubmit,
}: Props) => {
  const { departments, loading: depsLoading } = useDepartments();
  const { positions, loading: posLoading } = usePositions();
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
  } = useForm<FormValues>({
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

  const submitHandler = async (data: FormValues) => {
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
            <Box sx={formGridSx}>
              <StyledTextField
                label="Email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <StyledTextField
                label="Password"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <StyledTextField
                label="First Name"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />

              <StyledTextField
                label="Last Name"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />

              <StyledSelect
                label="Department"
                value={watch('departmentId') ?? ''}
                onChange={e =>
                  setValue('departmentId', e.target.value, {
                    shouldDirty: true,
                  })
                }
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
                value={watch('positionId') ?? ''}
                onChange={e =>
                  setValue('positionId', e.target.value, {
                    shouldDirty: true,
                  })
                }
                disabled={posLoading}
              >
                <MenuItem value="">None</MenuItem>
                {positions.map(pos => (
                  <MenuItem key={pos.id} value={pos.id}>
                    {pos.name}
                  </MenuItem>
                ))}
              </StyledSelect>

              <StyledSelect
                label="Role"
                value={watch('role')}
                onChange={e =>
                  setValue('role', e.target.value as 'Admin' | 'Employee', {
                    shouldDirty: true,
                  })
                }
              >
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </StyledSelect>
            </Box>
          </DialogContent>

          <DialogActions sx={dialogActionsSx}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={cancelButtonSx}
            >
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