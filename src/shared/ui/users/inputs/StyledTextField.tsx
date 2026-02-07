'use client';

import { TextField, TextFieldProps } from '@mui/material';
import {
  borderColor,
  focusDangerColor,
  getTextFieldStyles,
} from './StyledTextField.styles';

type FocusVariant = 'default' | 'danger';

type Props = TextFieldProps & {
  focusVariant?: FocusVariant;
};

export const StyledTextField = ({
  focusVariant = 'default',
  ...props
}: Props) => {
  const focusColor =
    focusVariant === 'danger' ? focusDangerColor : borderColor;

  return (
    <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      {...props}
      sx={{
        ...getTextFieldStyles(focusColor),
        ...props.sx,
      }}
    />
  );
};