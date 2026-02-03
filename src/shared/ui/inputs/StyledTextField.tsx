'use client';

import { TextField, TextFieldProps } from '@mui/material';

type FocusVariant = 'default' | 'danger';

type Props = TextFieldProps & {
  focusVariant?: FocusVariant;
};
const borderColor = 'rgba(146, 146, 146, 0.7)';
const hoverBorderColor = 'rgba(180, 180, 180, 0.9)'; 
const focusDangerColor = '#E53935';
const bgColor = 'rgba(53, 53, 53, 1)';
const textColor = '#fff';
const labelColor = '#9e9e9e';

export const StyledTextField = ({
  focusVariant = 'default',
  ...props
}: Props) => {
  const focusColor =
    focusVariant === 'danger'
      ? focusDangerColor
      : borderColor;

  return (
    <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      {...props}
      sx={{
        '& .MuiInputLabel-root': {
          color: labelColor,
          backgroundColor: bgColor,
          px: 0.5,

          '&.Mui-focused': {
            color: focusColor,
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
            borderColor: hoverBorderColor,
          },

          '&.Mui-focused fieldset': {
            borderColor: focusColor,
          },

          '&.Mui-disabled fieldset': {
            borderColor,
          },
        },

        '& input': {
          color: textColor,
        },

        ...props.sx,
      }}
    />
  );
};