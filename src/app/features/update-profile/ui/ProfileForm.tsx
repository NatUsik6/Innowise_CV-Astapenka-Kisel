'use client';

import { User } from '@/app/entities/user/model/types';
import { StyledSelect } from '@/shared/ui/inputs/StyledSelect';
import { StyledTextField } from '@/shared/ui/inputs/StyledTextField';
import { Box, MenuItem } from '@mui/material';
import { ChangeEvent } from 'react';


interface Props {
  user: User;
  departments: string[];
  positions: string[];
  onChange: (data: Partial<User>) => void;
}

export const ProfileForm = ({
  user,
  departments,
  positions,
  onChange,
}: Props) => {
  const handle =
    (field: keyof User | 'profile.firstName' | 'profile.lastName') =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (field.startsWith('profile')) {
        const key = field.split('.')[1] as 'firstName' | 'lastName';
        onChange({
          profile: { ...user.profile, [key]: e.target.value },
        } as Partial<User>);
      } else {
        onChange({ [field]: e.target.value } as Partial<User>);
      }
    };

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
      <StyledTextField
        label="First Name"
        value={user.profile.firstName}
        onChange={handle('profile.firstName')}
      />

      <StyledTextField
        label="Last Name"
        value={user.profile.lastName}
        onChange={handle('profile.lastName')}
      />

      <StyledSelect
        value={user.department_name}
        onChange={handle('department_name')}
      >
        {departments.map(dep => (
          <MenuItem key={dep} value={dep}>
            {dep}
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledSelect
        value={user.position_name}
        onChange={handle('position_name')}
      >
        {positions.map(pos => (
          <MenuItem key={pos} value={pos}>
            {pos}
          </MenuItem>
        ))}
      </StyledSelect>
    </Box>
  );
};
