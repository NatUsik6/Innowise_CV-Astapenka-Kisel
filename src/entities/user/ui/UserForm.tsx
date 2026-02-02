'use client';

import {
  DialogContent,
  TextField,
  MenuItem,
} from '@mui/material';

import { UserRole } from '@/entities/user/model/types';

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  department_name: string;
  position: string;
  position_name: string;
  role: UserRole;
}

interface Props {
  values: UserFormValues;
  onChange: (values: UserFormValues) => void;
}

export const UserForm = ({ values, onChange }: Props) => {
  const handleChange =
    (field: keyof UserFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...values,
        [field]: e.target.value,
      });
    };

  return (
    <DialogContent
      sx={{
        display: 'grid',
        gap: 2,
        mt: 1,
      }}
    >
      <TextField
        label="First name"
        value={values.firstName}
        onChange={handleChange('firstName')}
        fullWidth
      />

      <TextField
        label="Last name"
        value={values.lastName}
        onChange={handleChange('lastName')}
        fullWidth
      />

      <TextField
        label="Email"
        value={values.email}
        onChange={handleChange('email')}
        fullWidth
      />

      <TextField
        select
        label="Department"
        value={values.department}
        onChange={e => {
          const value = e.target.value;
          onChange({
            ...values,
            department: value,
            department_name:
              value === 'design'
                ? 'Design'
                : 'Development',
          });
        }}
        fullWidth
      >
        <MenuItem value="design">Design</MenuItem>
        <MenuItem value="dev">Development</MenuItem>
      </TextField>

      <TextField
        select
        label="Position"
        value={values.position}
        onChange={e => {
          const value = e.target.value;
          onChange({
            ...values,
            position: value,
            position_name:
              value === 'designer'
                ? 'Designer'
                : 'Frontend',
          });
        }}
        fullWidth
      >
        <MenuItem value="designer">Designer</MenuItem>
        <MenuItem value="frontend">Frontend</MenuItem>
      </TextField>

      <TextField
        select
        label="Role"
        value={values.role}
        onChange={handleChange('role')}
        fullWidth
      >
        <MenuItem value="USER">User</MenuItem>
        <MenuItem value="ADMIN">Admin</MenuItem>
      </TextField>
    </DialogContent>
  );
};
