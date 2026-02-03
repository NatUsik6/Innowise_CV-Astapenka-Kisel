'use client';

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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { User } from '@/entities/user/model/types';
import { createUserSchema } from '../model/createUserSchema';
import { StyledTextField } from '@/features/update-user/ui/fields/StyledTextField';
import { StyledSelect } from '@/features/update-user/ui/fields/StyledSelect';

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
  onSubmit: (user: User & { password: string }) => void;
}

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  department_name?: string;
  position_name?: string;
  role?: 'USER' | 'ADMIN';
};

export const CreateUserModal = ({
  open,
  onClose,
  onSubmit,
}: Props) => {
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
      department_name: '',
      position_name: '',
      role: 'USER',
    },
  });

  const password = watch('password');

  const submitHandler = (data: FormValues) => {
    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      role: data.role ?? 'USER',
      department: data.department_name ?? '',
      department_name: data.department_name ?? '',
      position: data.position_name ?? '',
      position_name: data.position_name ?? '',
    };

    onSubmit(newUser);
    reset();
  };

  const isCreateActive = isDirty && !!password;

  return (
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
              value={watch('department_name') ?? ''}
              onChange={e =>
                setValue('department_name', e.target.value, {
                  shouldDirty: true,
                })
              }
            >
              <MenuItem value="React">React</MenuItem>
              <MenuItem value=".NET">.NET</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
            </StyledSelect>

            <StyledSelect
              label="Position"
              value={watch('position_name') ?? ''}
              onChange={e =>
                setValue('position_name', e.target.value, {
                  shouldDirty: true,
                })
              }
            >
              <MenuItem value="Software Engineer">
                Software Engineer
              </MenuItem>
              <MenuItem value="Data Analyst">
                Data Analyst
              </MenuItem>
            </StyledSelect>

            <StyledSelect
              label="Role"
              value={watch('role') ?? 'USER'}
              onChange={e =>
                setValue('role', e.target.value as 'USER' | 'ADMIN', {
                  shouldDirty: true,
                })
              }
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
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
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
