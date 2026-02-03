'use client';

import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
} from '@mui/material';
import { PropsWithChildren } from 'react';

type FocusVariant = 'default' | 'danger';

type Props = PropsWithChildren<
  SelectProps & {
    label: string;
    focusVariant?: FocusVariant;
  }
>;

const borderColor = 'rgba(146, 146, 146, 0.7)';
const hoverBorderColor = 'rgba(180, 180, 180, 0.9)';
const focusDangerColor = '#E53935';
const bgColor = 'rgba(53, 53, 53, 1)';
const textColor = '#fff';
const labelColor = '#9e9e9e';

export const StyledSelect = ({
  label,
  focusVariant = 'default',
  children,
  ...props
}: Props) => {
  const focusColor =
    focusVariant === 'danger'
      ? focusDangerColor
      : borderColor;

  return (
    <FormControl fullWidth>
      <InputLabel
        shrink
        sx={{
          color: labelColor,
          backgroundColor: bgColor,
          px: 0.5,

          '&.Mui-focused': {
            color: focusColor,
          },

          '&.MuiInputLabel-shrink': {
            transform:
              'translate(14px, -9px) scale(0.75)',
          },
        }}
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
              border:
                '1px solid rgba(146,146,146,0.7)',
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

          '&:hover .MuiOutlinedInput-notchedOutline':
            {
              borderColor: hoverBorderColor,
            },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: focusColor,
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
