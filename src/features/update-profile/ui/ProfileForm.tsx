import { ChangeEvent } from 'react';
import { Box, MenuItem } from '@mui/material';
import { StyledSelect } from '@/shared/ui/inputs/StyledSelect';
import { StyledTextField } from '@/shared/ui/inputs/StyledTextField';

import { formGridSx, menuItemSx } from './ProfileForm.styles';
import { User } from '@/entities/user/model/types';

interface Department {
  id: string;
  name: string;
}

interface Position {
  id: string;
  name: string;
}

interface Props {
  user: User;
  departments: Department[];
  positions: Position[];
  readOnly: boolean;
  isAdmin: boolean;
  isOwnProfile: boolean; 
  onChange: (data: Partial<User>) => void;
}

export const ProfileForm = ({
  user,
  departments,
  positions,
  readOnly,
  isAdmin,
  isOwnProfile, 
  onChange,
}: Props) => {
  const canEdit = !readOnly && (isAdmin || isOwnProfile);

  const handleTextChange =
    (field: 'firstName' | 'lastName') =>
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        profile: {
          ...user.profile,
          [field]: e.target.value,
        },
      });
    };

  return (
    <Box sx={formGridSx}>
      <StyledTextField
        label="First Name"
        value={user.profile.firstName}
        focusVariant="danger"
        onChange={handleTextChange('firstName')}
        disabled={readOnly}
      />

      <StyledTextField
        label="Last Name"
        value={user.profile.lastName}
        focusVariant="danger"
        onChange={handleTextChange('lastName')}
        disabled={readOnly}
      />

      {canEdit ? (
        <StyledSelect
          label="Department"
          value={user.department}
          focusVariant="danger"
          onChange={e => {
            const selectedId = e.target.value as string;
            const dep = departments.find(d => d.id === selectedId);
            onChange({
              department: selectedId,
              department_name: dep?.name ?? '',
            });
          }}
        >
          {departments.map(dep => (
            <MenuItem key={dep.id} value={dep.id} sx={menuItemSx}>
              {dep.name}
            </MenuItem>
          ))}
        </StyledSelect>
      ) : (
        <StyledTextField
          label="Department"
          value={user.department_name}
          focusVariant="danger"
          disabled
        />
      )}

      {canEdit ? (
        <StyledSelect
          label="Position"
          value={user.position}
          focusVariant="danger"
          onChange={e => {
            const selectedId = e.target.value as string;
            const pos = positions.find(p => p.id === selectedId);
            onChange({
              position: selectedId,
              position_name: pos?.name ?? '',
            });
          }}
        >
          {positions.map(pos => (
            <MenuItem key={pos.id} value={pos.id} sx={menuItemSx}>
              {pos.name}
            </MenuItem>
          ))}
        </StyledSelect>
      ) : (
        <StyledTextField
          label="Position"
          value={user.position_name}
          focusVariant="danger"
          disabled
        />
      )}
    </Box>
  );
};