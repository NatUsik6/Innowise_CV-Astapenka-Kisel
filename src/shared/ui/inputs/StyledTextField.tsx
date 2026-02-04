'use client';

import { TextField, TextFieldProps } from "@mui/material";
import { FocusVariant, textColor } from './StyledInputs/inputs.constants';
import { getInputsLabelStyle } from './StyledInputs/InputsLabel.styles';
import { getOutlinedInputStyle } from './StyledInputs/OutlinedInput.styles';


type Props = TextFieldProps & {
  focusVariant?: FocusVariant;
};

export const StyledTextField = ({
  focusVariant = 'default',
  ...props
}: Props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      {...props}
      sx={{
        '& .MuiInputLabel-root':
          getInputsLabelStyle(focusVariant),

        '& .MuiOutlinedInput-root':
          getOutlinedInputStyle(focusVariant),

        '& input': {
          color: textColor,
        },

        ...props.sx,
      }}
    />
  );
};
