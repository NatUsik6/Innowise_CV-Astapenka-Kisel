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
import { StyledTextField } from '@/features/update-user/ui/fields/StyledTextField';
import { StyledSelect } from '@/features/update-user/ui/fields/StyledSelect';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: User & { password: string }) => void;
}

export const CreateUserModal = ({
  open,
  onClose,
  onSubmit,
}: Props) => {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    department: '',
    department_name: '',
    position: '',
    position_name: '',
    role: 'USER' as const,
  });

  const [password, setPassword] = useState('');

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({
        ...prev,
        [key]: e.target.value,
      }));

  const handleSubmit = () => {
    onSubmit({
      ...form,
      id: crypto.randomUUID(),
      password,
    });
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
        <IconButton
          onClick={onClose}
          sx={{ color: '#bdbdbd' }}
        >
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
            onChange={handleChange('email')}
          />

          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <StyledTextField
            label="First Name"
            value={form.firstName}
            onChange={handleChange('firstName')}
          />

          <StyledTextField
            label="Last Name"
            value={form.lastName}
            onChange={handleChange('lastName')}
          />

          <StyledSelect
            label="Department"
            value={form.department_name}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                department_name: e.target.value,
              }))
            }
          >
            <MenuItem value="React">React</MenuItem>
            <MenuItem value=".NET">.NET</MenuItem>
          </StyledSelect>

          <StyledSelect
            label="Position"
            value={form.position_name}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                position_name: e.target.value,
              }))
            }
          >
            <MenuItem value="Software Engineer">
              Software Engineer
            </MenuItem>
            <MenuItem value="Network Engineer">
              Network Engineer
            </MenuItem>
          </StyledSelect>

          <StyledSelect
            label="Role"
            value={form.role}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                role: e.target.value as any,
              }))
            }
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </StyledSelect>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#bdbdbd',
            borderColor: '#bdbdbd',
            borderRadius: '30px',
            width: 150,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#e53935',
            color: '#fff',
            borderRadius: '30px',
            width: 150,
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
