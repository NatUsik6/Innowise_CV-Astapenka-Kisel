'use client';

import { Typography } from '@mui/material';
import { createCvButtonSx } from './CreateCvButton.styles';

export const CreateCvButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <Typography onClick={onClick} sx={createCvButtonSx}>
      + CREATE CV
    </Typography>
  );
};