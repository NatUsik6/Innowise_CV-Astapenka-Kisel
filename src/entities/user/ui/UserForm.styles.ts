'use client';

import { styled } from '@mui/material/styles';
import { DialogContent, TextField } from '@mui/material';

export const FormContent = styled(DialogContent)({
  display: 'grid',
  gap: '16px',
  marginTop: '8px',
});

export const FormField = styled(TextField)({
  width: '100%',
});
