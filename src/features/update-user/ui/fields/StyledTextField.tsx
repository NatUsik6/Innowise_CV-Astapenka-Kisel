'use client';

import { TextField, TextFieldProps } from '@mui/material';

const borderColor = 'rgba(146, 146, 146, 0.7)';
const bgColor = 'rgba(53, 53, 53, 1)';
const textColor = '#fff';
const disabledTextColor = '#9e9e9e';

export const StyledTextField = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{ 
        shrink: true,
      }}
      {...props}
      sx={{
        '& .MuiInputLabel-root': {
          color: disabledTextColor,
          backgroundColor: bgColor,
          px: 0.5,
          '&.Mui-focused': {
            color: disabledTextColor, 
          },
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        },

        '& .MuiOutlinedInput-root': {
          backgroundColor: bgColor,
          color: textColor,

          '& fieldset': {
            borderColor,
          },
          '&:hover fieldset': {
            borderColor,
          },
          '&.Mui-focused fieldset': {
            borderColor,
          },
          '&.Mui-disabled fieldset': {
            borderColor,
          },
        },

        '& input': {
          color: textColor,
        },

        '& .Mui-disabled input': {
          WebkitTextFillColor: disabledTextColor,
          color: disabledTextColor,
        },

        ...props.sx,
      }}
    />
  );
};