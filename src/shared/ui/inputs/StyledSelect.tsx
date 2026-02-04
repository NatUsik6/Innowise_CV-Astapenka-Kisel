'use client';

import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
} from '@mui/material';
import { PropsWithChildren } from 'react';

import {
  FocusVariant,
  bgColor,
  borderColor,
  hoverBorderColor,
  textColor,
  getFocusColor,
} from './StyledInputs/inputs.constants';
import { getInputsLabelStyle } from './StyledInputs/InputsLabel.styles';


type Props = PropsWithChildren<
  SelectProps & {
    label: string;
    focusVariant?: FocusVariant;
  }
>;

export const StyledSelect = ({
  label,
  focusVariant = 'default',
  children,
  ...props
}: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        shrink
        sx={getInputsLabelStyle(focusVariant)}
      >
        {label}
      </InputLabel>

      <Select
        {...props}
        label={label}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
              borderRadius: 2,
              mt: 1,
            },
          },
        }}
        sx={{
          backgroundColor: bgColor,
          color: textColor,

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor,
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: hoverBorderColor,
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            borderColor:
              getFocusColor(focusVariant),
          },

          '& .MuiSelect-icon': {
            color: textColor,
          },

          '&.Mui-disabled': {
            opacity: 1,
          },

          ...props.sx,
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};
