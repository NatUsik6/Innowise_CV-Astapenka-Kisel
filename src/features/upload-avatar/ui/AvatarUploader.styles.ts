import { SxProps, Theme } from '@mui/material';

export const avatarBoxSx = (
    canEdit: boolean,
    isDragging: boolean
): SxProps<Theme> => ({
    width: 120,
    height: 120,
    borderRadius: '50%',
    bgcolor: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: canEdit ? 'pointer' : 'default',
    outline: isDragging
        ? '2px dashed #E53935'
        : 'none',
    outlineOffset: 2,
    transition: 'outline 0.15s ease',
});

