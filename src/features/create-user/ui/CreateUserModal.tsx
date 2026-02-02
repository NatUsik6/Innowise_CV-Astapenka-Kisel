'use client';

import { useEffect, useState } from 'react';
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
import { StyledTextField } from '@/features/update-user/ui/fields/StyledTextField';
import { StyledSelect } from '@/features/update-user/ui/fields/StyledSelect';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: User & { password: string }) => void;
}

const emptyForm = {
  email: '',
  firstName: '',
  lastName: '',
  department: '',
  department_name: '',
  position: '',
  position_name: '',
  role: 'USER' as const,
};

export const CreateUserModal = ({
  open,
  onClose,
  onSubmit,
}: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setPassword('');
    }
  }, [open]);

  const isDirty =
    form.email.trim() !== '' ||
    form.firstName.trim() !== '' ||
    form.lastName.trim() !== '' ||
    form.department_name.trim() !== '' ||
    form.position_name.trim() !== '' ||
    password.trim() !== '';

  const handleInputChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSelectChange = (field: keyof typeof form) => (
    e: any
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!isDirty) return;
        const newUser: User & { password: string } = {
      ...form,
      id: crypto.randomUUID(), 
      password,
    };
    
    onSubmit(newUser);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(53,53,53,1)',
          color: '#fff',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Create user
        <IconButton onClick={onClose} sx={{ color: '#bdbdbd' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 3,
            mt: 1,
          }}
        >
          <StyledTextField
            label="Email"
            value={form.email}
            onChange={handleInputChange('email')}
            required
          />

          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <StyledTextField
            label="First Name"
            value={form.firstName}
            onChange={handleInputChange('firstName')}
          />

          <StyledTextField
            label="Last Name"
            value={form.lastName}
            onChange={handleInputChange('lastName')}
          />

          <StyledSelect
            label="Department"
            value={form.department_name}
            onChange={handleSelectChange('department_name')}
          >
            <MenuItem value="React">React</MenuItem>
            <MenuItem value=".NET">.NET</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
          </StyledSelect>

          <StyledSelect
            label="Position"
            value={form.position_name}
            onChange={handleSelectChange('position_name')}
          >
            <MenuItem value="Software Engineer">
              Software Engineer
            </MenuItem>
            <MenuItem value="Data Analyst">
              Data Analyst
            </MenuItem>
            <MenuItem value="Product Manager">
              Product Manager
            </MenuItem>
          </StyledSelect>

          <StyledSelect
            label="Role"
            value={form.role}
            onChange={handleSelectChange('role')}
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </StyledSelect>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="contained"
          disabled={!isDirty}
          onClick={handleSubmit}
          sx={{
            backgroundColor: isDirty ? '#e53935' : '#5b5b5b',
            color: isDirty ? '#fff' : '#c6c6c6',
            borderRadius: '30px',
            width: 150,
            '&:hover': {
              backgroundColor: isDirty ? '#d32f2f' : '#5b5b5b',
            },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};