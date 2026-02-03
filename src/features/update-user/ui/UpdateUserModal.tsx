'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { User } from '@/entities/user/model/types';
import { useUpdateUserForm } from '../model/useUpdateUserForm';
import { StyledTextField } from './fields/StyledTextField';
import { StyledSelect } from './fields/StyledSelect';

import {
  dialogPaperSx,
  dialogTitleSx,
  closeIconSx,
  formGridSx,
  dialogActionsSx,
  cancelButtonSx,
  updateButtonSx,
} from './UpdateUserModal.styles';

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (data: User & { password?: string }) => void;
}

export const UpdateUserModal = ({
  open,
  user,
  onClose,
  onSubmit,
}: Props) => {
  const {
    form,
    handleInputChange,
    handleSelectChange,
    isDirty,
  } = useUpdateUserForm(user);

  const [password, setPassword] = useState('');

  if (!form) return null;

  const isActive = isDirty || !!password;

  const handleSubmit = () => {
    onSubmit({
      ...form,
      ...(password ? { password } : {}),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: dialogPaperSx }}>
      <DialogTitle sx={dialogTitleSx}>
        Update user
        <IconButton onClick={onClose} sx={closeIconSx}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={formGridSx}>
          <StyledTextField label="Email" value={form.email} onChange={handleInputChange('email')} />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="*********"
          />
          <StyledTextField label="First Name" value={form.firstName} onChange={handleInputChange('firstName')} />
          <StyledTextField label="Last Name" value={form.lastName} onChange={handleInputChange('lastName')} />

          <StyledSelect label="Department" value={form.department_name} onChange={handleSelectChange('department_name')}>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value=".NET">.NET</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
          </StyledSelect>

          <StyledSelect label="Position" value={form.position_name} onChange={handleSelectChange('position_name')}>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="Data Analyst">Data Analyst</MenuItem>
          </StyledSelect>

          <StyledSelect label="Role" value={form.role} onChange={handleSelectChange('role')}>
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </StyledSelect>
        </Box>
      </DialogContent>

      <DialogActions sx={dialogActionsSx}>
        <Button onClick={onClose} variant="outlined" sx={cancelButtonSx}>
          Cancel
        </Button>

        <Button onClick={handleSubmit} variant="contained" disabled={!isActive} sx={updateButtonSx(isActive)}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
