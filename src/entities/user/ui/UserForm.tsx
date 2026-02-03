'use client';

import { MenuItem } from '@mui/material';
import { UserRole } from '@/entities/user/model/types';

import { FormContent, FormField } from './UserForm.styles';

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
    <FormContent>
      <FormField
        label="First name"
        value={values.firstName}
        onChange={handleChange('firstName')}
      />

      <FormField
        label="Last name"
        value={values.lastName}
        onChange={handleChange('lastName')}
      />

      <FormField
        label="Email"
        value={values.email}
        onChange={handleChange('email')}
      />

      <FormField
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
      >
        <MenuItem value="design">Design</MenuItem>
        <MenuItem value="dev">Development</MenuItem>
      </FormField>

      <FormField
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
      >
        <MenuItem value="designer">Designer</MenuItem>
        <MenuItem value="frontend">Frontend</MenuItem>
      </FormField>

      <FormField
        select
        label="Role"
        value={values.role}
        onChange={handleChange('role')}
      >
        <MenuItem value="USER">User</MenuItem>
        <MenuItem value="ADMIN">Admin</MenuItem>
      </FormField>
    </FormContent>
  );
};
