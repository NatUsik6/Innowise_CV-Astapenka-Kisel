'use client';

import { ChangeEvent } from 'react';
import { Box, MenuItem } from '@mui/material';

import { StyledSelect } from '@/shared/ui/inputs/StyledSelect';
import { StyledTextField } from '@/shared/ui/inputs/StyledTextField';

import {
  formGridSx,
  menuItemSx,
} from './ProfileForm.styles';
import { User } from '@/entities/user/model/types';

interface Props {
  user: User;
  departments: string[];
  positions: string[];
  readOnly: boolean;
  onChange: (data: Partial<User>) => void;
}

export const ProfileForm = ({
  user,
  departments,
  positions,
  readOnly,
  onChange,
}: Props) => {
  const handleTextChange =
    (field: 'profile.firstName' | 'profile.lastName') =>
    (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Box sx={formGridSx}>
      <StyledTextField
        label="First Name"
        value={user.profile.firstName}
        focusVariant="danger"
        onChange={handleTextChange('profile.firstName')}
        disabled={readOnly}
      />

      <StyledTextField
        label="Last Name"
        value={user.profile.lastName}
        focusVariant="danger"
        onChange={handleTextChange('profile.lastName')}
        disabled={readOnly}
      />

      {readOnly ? (
        <StyledTextField
          label="Department"
          value={user.department_name}
          focusVariant="danger"
          disabled
        />
      ) : (
        <StyledSelect
          label="Department"
          value={user.department_name}
          focusVariant="danger"
          onChange={e =>
            onChange({
              department_name: e.target.value as string,
            })
          }
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
      )}

      {readOnly ? (
        <StyledTextField
          label="Position"
          value={user.position_name}
          focusVariant="danger"
          disabled
        />
      ) : (
        <StyledSelect
          label="Position"
          value={user.position_name}
          focusVariant="danger"
          onChange={e =>
            onChange({
              position_name: e.target.value as string,
            })
          }
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
      )}
    </Box>
  );
};
