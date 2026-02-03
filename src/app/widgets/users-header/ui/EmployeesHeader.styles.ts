'use client';

import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const HeaderLinkText = styled(Typography)({
  color: '#797878ff',
  fontWeight: 400,
  cursor: 'pointer',
  marginBottom: '8px',
  paddingLeft: '20px',
  paddingTop: '15px',
  paddingBottom: '5px',
  fontSize: '16px',

  '&:hover': {
    opacity: 0.8,
  },
});
