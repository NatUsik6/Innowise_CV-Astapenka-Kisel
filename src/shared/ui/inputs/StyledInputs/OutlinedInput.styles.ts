import {
  FocusVariant,
  bgColor,
  borderColor,
  hoverBorderColor,
  textColor,
  getFocusColor,
} from './inputs.constants'

export const getOutlinedInputStyle = (
  focusVariant: FocusVariant
) => ({
  backgroundColor: bgColor,
  color: textColor,

  '& fieldset': {
    borderColor,
  },

  '&:hover fieldset': {
    borderColor: hoverBorderColor,
  },

  '&.Mui-focused fieldset': {
    borderColor: getFocusColor(focusVariant),
  },

  '&.Mui-disabled fieldset': {
    borderColor,
  },

  '&.Mui-disabled input': {
    WebkitTextFillColor: textColor,
    color: textColor,
    cursor: 'default',
  },
});
