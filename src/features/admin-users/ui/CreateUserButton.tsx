'use client';

import { Typography } from '@mui/material';

export const CreateUserButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Typography
      onClick={onClick}
      sx={{
        color: '#e53935',
        fontWeight: 500,
        cursor: 'pointer',
        ml: 'auto',
        pr: '20px',
        userSelect: 'none',

        '&:hover': {
          opacity: 0.8,
        },
      }}
    >
      + CREATE USER
    </Typography>
  );
};
