import {
  FocusVariant,
  bgColor,
  borderColor,
  labelColor,
  getFocusColor,
} from './inputs.constants';

export const getInputsLabelStyle = (focusVariant: FocusVariant) => ({
  color: labelColor,
  backgroundColor: bgColor,
  px: 0.5,

  '&.Mui-focused': {
    color: getFocusColor(focusVariant),
  },

  '&.Mui-disabled': {
    color: borderColor,
  },

  '&.MuiInputLabel-shrink': {
    transform: 'translate(14px, -9px) scale(0.75)',
  },
});
