'use client';

import { Box, MenuItem, SxProps, Theme } from '@mui/material';
import { UseFormRegister, UseFormWatch, FieldErrors, Control, Controller } from 'react-hook-form';

import { StyledTextField } from '@/shared/ui/users/inputs/StyledTextField';
import { StyledSelect } from '@/shared/ui/users/inputs/StyledSelect';
import { useDepartments } from '@/entities/user/api/department/api/useDepartments';
import { usePositions } from '@/entities/user/api/position/api/usePositions';

export type CreateUserFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId?: string;
  positionId?: string;
  role: 'Admin' | 'Employee';
};

interface Props {
  register: UseFormRegister<CreateUserFormValues>;
  watch: UseFormWatch<CreateUserFormValues>;
  control: Control<CreateUserFormValues>;
  errors: FieldErrors<CreateUserFormValues>;
  formGridSx?: SxProps<Theme>;
}

export const CreateUserForm = ({
  register,
  watch,
  control,
  errors,
  formGridSx,
}: Props) => {
  const { departments, loading: depsLoading } = useDepartments();
  const { positions, loading: posLoading } = usePositions();

  return (
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

      <Controller
        name="departmentId"
        control={control}
        render={({ field }) => (
          <StyledSelect
            label="Department"
            value={field.value ?? ''}
            onChange={e => {
              const value = e.target.value;
              field.onChange(value === '' ? undefined : value);
            }}
            disabled={depsLoading}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {departments.map(dep => (
              <MenuItem key={dep.id} value={String(dep.id)}>
                {dep.name}
              </MenuItem>
            ))}
          </StyledSelect>
        )}
      />

      <Controller
        name="positionId"
        control={control}
        render={({ field }) => (
          <StyledSelect
            label="Position"
            value={field.value ?? ''}
            onChange={e => {
              const value = e.target.value;
              field.onChange(value === '' ? undefined : value);
            }}
            disabled={posLoading}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {positions.map(pos => (
              <MenuItem key={pos.id} value={String(pos.id)}>
                {pos.name}
              </MenuItem>
            ))}
          </StyledSelect>
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <StyledSelect
            label="Role"
            value={field.value}
            onChange={e => field.onChange(e.target.value as 'Admin' | 'Employee')}
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </StyledSelect>
        )}
      />
    </Box>
  );
};