'use client';

import { Box, MenuItem } from '@mui/material';

import { User } from '@/entities/user/model/types';
import { StyledTextField } from '@/shared/ui/users/inputs/StyledTextField';
import { StyledSelect } from '@/shared/ui/users/inputs/StyledSelect';
import { useDepartments } from '@/entities/user/api/department/api/useDepartments';
import { usePositions } from '@/entities/user/api/position/api/usePositions';

export type UpdateUserFormData = {
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  email: string;
  role: 'Admin' | 'Employee';
};

interface Props {
  user: User;
  formData: UpdateUserFormData;
  onChange: (field: keyof UpdateUserFormData, value: string) => void;
  formGridSx?: any;
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
        value={user.email}
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
        value={formData.departmentId}
        onChange={e => onChange('departmentId', e.target.value)}
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
        value={formData.positionId}
        onChange={e => onChange('positionId', e.target.value)}
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
        value={formData.role}
        onChange={e => onChange('role', e.target.value as 'Admin' | 'Employee')}
      >
        <MenuItem value="Employee">Employee</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
      </StyledSelect>
    </Box>
  );
};
