'use client';

import { Box, MenuItem } from '@mui/material';
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';

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
  setValue: UseFormSetValue<CreateUserFormValues>;
  errors: FieldErrors<CreateUserFormValues>;
  formGridSx?: any;
}

export const CreateUserForm = ({
  register,
  watch,
  setValue,
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
  );
};
