import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgba(53, 53, 53, 1)',
    },
    primary: {
      main: 'rgba(198, 48, 49, 1)',
    },
  },
  typography: {
    fontFamily: 'roboto',
    button: {
      textTransform: 'uppercase',
    },
  },
});