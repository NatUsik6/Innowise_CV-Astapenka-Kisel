'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { User } from '@/entities/user/model/types';

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const disabledColor = 'rgba(146, 146, 146, 0.7)';
const bgColor = 'rgba(53, 53, 53, 1)';

export const UpdateUserModal = ({
  open,
  user,
  onClose,
  onSubmit,
}: Props) => {
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  if (!form) return null;

  const handleChange =
    (field: keyof User) =>
    (e: any) => {
      setForm(prev =>
        prev ? { ...prev, [field]: e.target.value } : prev
      );
    };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: bgColor,
          color: '#fff',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 18, fontWeight: 500 }}>
        Update user
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
          }}
        >
          <FormField label="Email">
            <StyledTextField value={form.email} disabled />
          </FormField>

          <FormField label="Password">
            <StyledTextField type="password" value="********" />
          </FormField>

          <FormField label="First Name">
            <StyledTextField
              value={form.firstName}
              onChange={handleChange('firstName')}
            />
          </FormField>

          <FormField label="Last Name">
            <StyledTextField
              value={form.lastName}
              onChange={handleChange('lastName')}
            />
          </FormField>

          <FormField label="Department">
            <StyledSelect
              value={form.department_name}
              onChange={handleChange('department_name')}
            >
              <MenuItem value="React">React</MenuItem>
              <MenuItem value=".NET">.NET</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
            </StyledSelect>
          </FormField>

          <FormField label="Position">
            <StyledSelect
              value={form.position_name}
              onChange={handleChange('position_name')}
            >
              <MenuItem value="Software Engineer">
                Software Engineer
              </MenuItem>
              <MenuItem value="Data Analyst">
                Data Analyst
              </MenuItem>
            </StyledSelect>
          </FormField>

          <FormField label="Role">
            <StyledSelect disabled value={form.role}>
              <MenuItem value={form.role}>{form.role}</MenuItem>
            </StyledSelect>
          </FormField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
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
          variant="contained"
          onClick={() => onSubmit(form)}
          sx={{
            backgroundColor: '#5b5b5b',
            color: '#c6c6c6',
            borderRadius: '30px',
            width: 150,
            '&:hover': {
              backgroundColor: '#4d4c4c',
            },
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/* ---------- Styled fields ---------- */

const StyledTextField = (props: any) => (
  <TextField
    fullWidth
    variant="outlined"
    {...props}
    sx={{
      '& .MuiOutlinedInput-root': {
        backgroundColor: bgColor,
        color: '#fff',

        '& fieldset': {
          borderColor: disabledColor,
        },
        '&:hover fieldset': {
          borderColor: disabledColor,
        },
        '&.Mui-focused fieldset': {
          borderColor: disabledColor,
        },
        '&.Mui-disabled fieldset': {
          borderColor: disabledColor,
        },
      },
      '& .MuiOutlinedInput-input.Mui-disabled': {
        WebkitTextFillColor: disabledColor,
      },
    }}
  />
);

const StyledSelect = (props: any) => (
  <Select
    fullWidth
    variant="outlined"
    {...props}
    sx={{
      backgroundColor: bgColor,
      color: '#fff',

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: disabledColor,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: disabledColor,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: disabledColor,
      },

      '& .MuiSelect-icon': {
        color: '#fff',
      },

      '&.Mui-disabled': {
        color: disabledColor,
      },
      '&.Mui-disabled .MuiSelect-icon': {
        color: disabledColor,
      },
    }}
  />
);

/* ---------- Label ---------- */

const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Typography
      variant="caption"
      sx={{
        color: '#9e9e9e',
        mb: 0.5,
        display: 'block',
      }}
    >
      {label}
    </Typography>
    {children}
  </Box>
);
// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   Box,
//   Typography,
// } from '@mui/material';
// import { User } from '@/entities/user/model/types';

// interface Props {
//   open: boolean;
//   user: User | null;
//   mode?: 'create' | 'update';
//   onClose: () => void;
//   onSubmit: (user: User) => void;
// }

// const disabledColor = 'rgba(146, 146, 146, 0.7)';
// const bgColor = 'rgba(53, 53, 53, 1)';

// export const UpdateUserModal = ({
//   open,
//   user,
//   mode = 'update',
//   onClose,
//   onSubmit,
// }: Props) => {
//   const [form, setForm] = useState<User | null>(null);
//   const isCreate = mode === 'create';

//   useEffect(() => {
//     if (user) setForm(user);
//   }, [user]);

//   if (!form) return null;

//   const handleChange =
//     (field: keyof User) =>
//     (e: any) => {
//       setForm(prev =>
//         prev ? { ...prev, [field]: e.target.value } : prev
//       );
//     };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           backgroundColor: bgColor,
//           color: '#fff',
//           borderRadius: 2,
//         },
//       }}
//     >
//       <DialogTitle>
//         {isCreate ? 'Create user' : 'Update user'}
//       </DialogTitle>

//       <DialogContent sx={{ mt: 1 }}>
//         <Box
//           sx={{
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: 2,
//           }}
//         >
//           <FormField label="Email">
//             <StyledTextField
//               value={form.email}
//               onChange={handleChange('email')}
//               disabled={!isCreate}
//             />
//           </FormField>

//           <FormField label="Password">
//             <StyledTextField type="password" value="********" />
//           </FormField>

//           <FormField label="First Name">
//             <StyledTextField
//               value={form.firstName}
//               onChange={handleChange('firstName')}
//             />
//           </FormField>

//           <FormField label="Last Name">
//             <StyledTextField
//               value={form.lastName}
//               onChange={handleChange('lastName')}
//             />
//           </FormField>

//           <FormField label="Department">
//             <StyledSelect
//               value={form.department_name}
//               onChange={handleChange('department_name')}
//             >
//               <MenuItem value="React">React</MenuItem>
//               <MenuItem value=".NET">.NET</MenuItem>
//               <MenuItem value="Java">Java</MenuItem>
//             </StyledSelect>
//           </FormField>

//           <FormField label="Position">
//             <StyledSelect
//               value={form.position_name}
//               onChange={handleChange('position_name')}
//             >
//               <MenuItem value="Software Engineer">
//                 Software Engineer
//               </MenuItem>
//               <MenuItem value="Data Analyst">
//                 Data Analyst
//               </MenuItem>
//             </StyledSelect>
//           </FormField>

//           <FormField label="Role">
//             <StyledSelect
//               value={form.role}
//               onChange={handleChange('role')}
//               disabled={!isCreate}
//             >
//               <MenuItem value="user">User</MenuItem>
//               <MenuItem value="admin">Admin</MenuItem>
//             </StyledSelect>
//           </FormField>
//         </Box>
//       </DialogContent>

//       <DialogActions sx={{ p: 3, gap: 1 }}>
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           sx={{
//             color: '#bdbdbd',
//             borderColor: '#bdbdbd',
//             borderRadius: '30px',
//             width: 150,
//           }}
//         >
//           Cancel
//         </Button>

//         <Button
//           variant="contained"
//           onClick={() => onSubmit(form)}
//           sx={{
//             backgroundColor: '#5b5b5b',
//             color: '#c6c6c6',
//             borderRadius: '30px',
//             width: 150,
//           }}
//         >
//           {isCreate ? 'Create' : 'Update'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// /* ---------- helpers ---------- */

// const StyledTextField = (props: any) => (
//   <TextField
//     fullWidth
//     variant="outlined"
//     {...props}
//     sx={{
//       '& .MuiOutlinedInput-root': {
//         backgroundColor: bgColor,
//         color: '#fff',
//         '& fieldset': { borderColor: disabledColor },
//       },
//     }}
//   />
// );

// const StyledSelect = (props: any) => (
//   <Select
//     fullWidth
//     {...props}
//     sx={{
//       backgroundColor: bgColor,
//       color: '#fff',
//       '& .MuiOutlinedInput-notchedOutline': {
//         borderColor: disabledColor,
//       },
//     }}
//   />
// );

// const FormField = ({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) => (
//   <Box>
//     <Typography variant="caption" sx={{ color: '#9e9e9e' }}>
//       {label}
//     </Typography>
//     {children}
//   </Box>
// );
