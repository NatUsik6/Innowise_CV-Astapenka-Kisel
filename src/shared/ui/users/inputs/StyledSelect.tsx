'use client';

import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
} from '@mui/material';
import { ReactNode } from 'react';

const borderColor = 'rgba(146, 146, 146, 0.7)';
const bgColor = 'rgba(53, 53, 53, 1)';
const textColor = '#fff';
const disabledTextColor = '#9e9e9e';

interface StyledSelectProps extends Omit<SelectProps<string>, 'label'> {
  label: string;
  children: ReactNode;
}

export const StyledSelect = ({
  label,
  children,
  disabled,
  sx,
  value,
  ...props
}: StyledSelectProps) => {
  const labelId = `select-label-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <FormControl fullWidth>
      <InputLabel
        id={labelId}
        sx={{
          color: disabledTextColor,
          backgroundColor: bgColor,
          px: 0.5,
          '&.Mui-focused': {
            color: disabledTextColor,
          },
        }}
      >
        {label}
      </InputLabel>

      <Select
        {...props}
        labelId={labelId}
        label={label}
        value={value}
        disabled={disabled}
        sx={{
          backgroundColor: bgColor,
          color: disabled ? disabledTextColor : textColor,
          WebkitTextFillColor: disabled ? disabledTextColor : textColor,

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor,
          },

          '& .MuiSelect-icon': {
            color: disabled ? disabledTextColor : textColor,
          },

          '&.Mui-disabled': {
            opacity: 1,
          },

          ...sx,
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
              maxHeight: 300,

              '& .MuiMenuItem-root': {
                color: textColor,
                '&:hover': {
                  backgroundColor: 'rgba(146,146,146,0.15)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(146,146,146,0.25)',
                  '&:hover': {
                    backgroundColor: 'rgba(146,146,146,0.35)',
                  },
                },
              },
            },
          },
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};