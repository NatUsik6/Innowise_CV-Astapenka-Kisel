'use client';

import { Box, MenuItem, SxProps, Theme } from '@mui/material';
import { User, UpdateUserFormData } from '@/entities/user/model/types';
import { StyledTextField } from '@/shared/ui/users/inputs/StyledTextField';
import { StyledSelect } from '@/shared/ui/users/inputs/StyledSelect';
import { useDepartments } from '@/entities/user/api/department/api/useDepartments';
import { usePositions } from '@/entities/user/api/position/api/usePositions';

interface Props {
  user: User;
  formData: UpdateUserFormData;
  onChange: (field: keyof UpdateUserFormData, value: string | undefined) => void;
  formGridSx?: SxProps<Theme>;
}

export const UpdateUserForm = ({
  user,
  formData,
  onChange,
  formGridSx,
}: Props) => {
  const { departments, loading: depsLoading } = useDepartments();
  const { positions, loading: posLoading } = usePositions();

  return (
    <Box sx={formGridSx}>
      <StyledTextField
        label="Email"
        value={formData.email}
        disabled
      />

      <StyledTextField
        label="Password"
        value="**********"
        type="password"
        disabled
      />

      <StyledTextField
        label="First Name"
        value={formData.firstName}
        onChange={e => onChange('firstName', e.target.value)}
      />

      <StyledTextField
        label="Last Name"
        value={formData.lastName}
        onChange={e => onChange('lastName', e.target.value)}
      />

      <StyledSelect
        label="Department"
        value={formData.departmentId ?? ''}
        onChange={e => {
          const value = e.target.value;
          onChange('departmentId', value === '' ? undefined : value);
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

      <StyledSelect
        label="Position"
        value={formData.positionId ?? ''}
        onChange={e => {
          const value = e.target.value;
          onChange('positionId', value === '' ? undefined : value);
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

      <StyledSelect
        label="Role"
        value={formData.role}
        onChange={e => onChange('role', e.target.value as 'Admin' | 'Employee')}
      >
        <MenuItem value="Employee">Employee</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
      </StyledSelect>
    </Box>
  );
};