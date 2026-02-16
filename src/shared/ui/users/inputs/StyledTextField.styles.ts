export const borderColor = 'rgba(146, 146, 146, 0.7)';
export const hoverBorderColor = 'rgba(180, 180, 180, 0.9)';
export const focusDangerColor = '#E53935';
export const bgColor = 'rgba(53, 53, 53, 1)';
export const textColor = '#fff';
export const labelColor = '#9e9e9e';
export const disabledTextColor = 'rgba(255, 255, 255, 0.6)';

export const getTextFieldStyles = (focusColor: string) => ({
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

    '&.Mui-disabled': {
      color: labelColor,
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

    '&.Mui-disabled': {
      backgroundColor: bgColor,

      '& fieldset': {
        borderColor,
      },
    },
  },

  '& input': {
    color: textColor,

    '&.Mui-disabled': {
      color: disabledTextColor,
      WebkitTextFillColor: disabledTextColor,
    },
  },
  '& textarea': {
    color: textColor,

    '&.Mui-disabled': {
      color: disabledTextColor,
      WebkitTextFillColor: disabledTextColor,
    },
  },
});