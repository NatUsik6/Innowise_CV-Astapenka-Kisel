export const wrapperSx = (readonly: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  cursor: readonly ? 'default' : 'pointer',
  userSelect: 'none',
  '&:hover .mastery-bar': readonly
    ? {}
    : { opacity: 0.65, transform: 'scaleY(2)' },
});

export const masteryBarSx = (color: string) => ({
  width: 80,
  height: 3,
  borderRadius: 1,
  bgcolor: color,
  flexShrink: 0,
  transition: 'opacity .2s, transform .2s',
});

export const skillNameSx = {
  color: 'rgba(255,255,255,0.65)',
  whiteSpace: 'nowrap',
};
