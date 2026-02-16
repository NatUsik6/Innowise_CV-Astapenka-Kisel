import { Box, SxProps, TextField, Theme } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CreateCvFormValues } from '../model/createCvSchema';
import { textFieldSx } from './CreateCvModal.styles';

interface Props {
  register: UseFormRegister<CreateCvFormValues>;
  errors: FieldErrors<CreateCvFormValues>;
  formGridSx: SxProps<Theme>;
}

export const CreateCvForm = ({ register, errors, formGridSx }: Props) => {
  return (
    <Box sx={formGridSx}>
      <TextField
        {...register('name')}
        label="Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={textFieldSx}
      />
      <TextField
        {...register('education')}
        label="Education"
        fullWidth
        sx={textFieldSx}
      />
      <TextField
        {...register('description')}
        label="Description"
        fullWidth
        multiline
        rows={4}
        sx={textFieldSx}
      />
    </Box>
  );
};