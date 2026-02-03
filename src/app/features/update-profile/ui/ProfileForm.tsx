'use client';

import { ChangeEvent } from 'react';
import {
  Box,
  MenuItem,
} from '@mui/material';
import { SelectProps } from '@mui/material/Select';

import { User } from '@/app/entities/user/model/types';
import { StyledSelect } from '@/shared/ui/inputs/StyledSelect';
import { StyledTextField } from '@/shared/ui/inputs/StyledTextField';

interface Props {
  user: User;
  departments: string[];
  positions: string[];
  onChange: (data: Partial<User>) => void;
}

const menuItemSx = {
  color: '#fff',
  fontSize: 14,

  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  '&.Mui-selected': {
    backgroundColor: 'rgba(255,255,255,0.12)',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.16)',
    },
  },
};

export const ProfileForm = ({
  user,
  departments,
  positions,
  onChange,
}: Props) => {
  const handleTextChange =
    (field: 'profile.firstName' | 'profile.lastName') =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const key = field.split('.')[1] as
        | 'firstName'
        | 'lastName';

      onChange({
        profile: {
          ...user.profile,
          [key]: e.target.value,
        },
      });
    };

  const handleSelectChange =
    (field: 'department_name' | 'position_name') =>
    ((event) => {
      onChange({
        [field]: event.target.value as string,
      } as Partial<User>);
    }) as SelectProps['onChange'];

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gap={2}
    >
      <StyledTextField
        label="First Name"
        value={user.profile.firstName}
        focusVariant="danger"
        onChange={handleTextChange(
          'profile.firstName'
        )}
      />

      <StyledTextField
        label="Last Name"
        value={user.profile.lastName}
        focusVariant="danger"
        onChange={handleTextChange(
          'profile.lastName'
        )}
      />

      <StyledSelect
        label="Department"
        value={user.department_name}
        focusVariant="danger"
        onChange={handleSelectChange(
          'department_name'
        )}
      >
        {departments.map(dep => (
          <MenuItem
            key={dep}
            value={dep}
            sx={menuItemSx}
          >
            {dep}
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledSelect
        label="Position"
        value={user.position_name}
        focusVariant="danger"
        onChange={handleSelectChange(
          'position_name'
        )}
      >
        {positions.map(pos => (
          <MenuItem
            key={pos}
            value={pos}
            sx={menuItemSx}
          >
            {pos}
          </MenuItem>
        ))}
      </StyledSelect>
    </Box>
  );
};
