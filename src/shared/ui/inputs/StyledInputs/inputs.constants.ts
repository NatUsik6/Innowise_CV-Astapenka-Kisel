export type FocusVariant = 'default' | 'danger';

export const borderColor = 'rgba(146, 146, 146, 0.7)';
export const hoverBorderColor = 'rgba(180, 180, 180, 0.9)';
export const focusDangerColor = '#E53935';

export const bgColor = 'rgba(53, 53, 53, 1)';
export const textColor = '#fff';
export const labelColor = '#9e9e9e';

export const getFocusColor = (variant: FocusVariant) =>
  variant === 'danger' ? focusDangerColor : borderColor;
