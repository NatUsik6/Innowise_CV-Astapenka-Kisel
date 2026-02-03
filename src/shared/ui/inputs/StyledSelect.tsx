'use client';

import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
} from '@mui/material';
import { PropsWithChildren } from 'react';

const borderColor = 'rgba(146, 146, 146, 0.7)';
const bgColor = 'rgba(53, 53, 53, 1)';
const textColor = '#fff';
const disabledTextColor = '#9e9e9e';

type StyledSelectProps = PropsWithChildren<
  SelectProps<string> & {
    label: string;
  }
>;

export const StyledSelect = ({
  label,
  children,
  ...props
}: StyledSelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        shrink
        sx={{
          color: disabledTextColor,
          backgroundColor: bgColor,
          px: 0.5,
          '&.Mui-focused': {
            color: disabledTextColor,
          },
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        }}
      >
        {label}
      </InputLabel>

      <Select
        {...props}
        label={label}
        sx={{
          backgroundColor: bgColor,
          color: props.disabled
            ? disabledTextColor
            : textColor,

          WebkitTextFillColor: props.disabled
            ? disabledTextColor
            : textColor,

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
            color: props.disabled
              ? disabledTextColor
              : textColor,
          },

          '&.Mui-disabled': {
            opacity: 1,
          },

          ...props.sx,
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,

              '& .MuiMenuItem-root': {
                color: textColor,
                '&:hover': {
                  backgroundColor:
                    'rgba(146,146,146,0.15)',
                },
                '&.Mui-selected': {
                  backgroundColor:
                    'rgba(146,146,146,0.25)',
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

