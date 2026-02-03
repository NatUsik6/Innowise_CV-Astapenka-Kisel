'use client';

import { Typography } from '@mui/material';
import { createUserButtonSx } from './CreateUserButton.styles';

export const CreateUserButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <Typography onClick={onClick} sx={createUserButtonSx}>
      + CREATE USER
    </Typography>
  );
};
