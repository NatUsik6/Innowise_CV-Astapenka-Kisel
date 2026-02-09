import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StatusText = styled(Box)<{ color?: string }>(({ color }) => ({
  padding: '2rem',
  color: color ?? '#fff',
}));
