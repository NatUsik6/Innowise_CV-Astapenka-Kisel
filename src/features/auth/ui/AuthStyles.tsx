import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Tabs, Tab, Typography, Link, IconButton } from '@mui/material';

export const AuthWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: 'rgba(53, 53, 53, 1)',
  paddingTop: '0.5rem',
});

export const FormCard = styled(Box)({
  width: '100%',
  maxWidth: '35rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const StyledTabs = styled(Tabs)({
  marginBottom: '13.594rem',
  '& .MuiTabs-indicator': {
    backgroundColor: 'rgba(198, 48, 49, 1)',
    height: '2px',
  },
});

export const StyledTab = styled(Tab)({
  color: 'rgba(255, 255, 255, 1)',
  fontSize: '0.875rem',
  fontWeight: 400,
  letterSpacing: '1px',
  minWidth: '100px',
  textTransform: 'uppercase',
  '&.Mui-selected': {
    color: 'rgba(198, 48, 49, 1)',
  },
});

export const AuthTitle = styled(Typography)({
  '&.MuiTypography-root': {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 400,
    fontSize: '2.125rem',
    marginBottom: '1.593rem',
    textAlign: 'center',
  }
});

export const AuthSubtitle = styled(Typography)({
  '&.MuiTypography-root': {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: '1rem',
    marginBottom: '2.5rem',
    textAlign: 'center',
  }
});

export const LoginInput = styled(TextField)({
  width: '100%',
  marginBottom: '1rem',
  '& .MuiOutlinedInput-root': {
    color: 'rgba(255, 255, 255, 1)',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 1)' },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
    opacity: 1,
  },
  '& .MuiFormHelperText-root': {
    color: '#f44336',
    marginLeft: 0,
  },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0px 1000px rgba(53, 53, 53, 1) inset !important',
    WebkitTextFillColor: 'rgba(255, 255, 255, 1) !important',
  },
});

export const StyledForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const ActionsWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const VisibilityIconButton = styled(IconButton)({
  '&.MuiIconButton-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export const LoginButton = styled(Button)({
  backgroundColor: 'rgba(198, 48, 49, 1)',
  borderRadius: '2rem',
  padding: '0.6rem 4rem',
  marginTop: '2.75rem',
  fontWeight: '600',
  color: '#fff',
  textTransform: 'uppercase',
  '&:hover': { backgroundColor: '#a52121' },
});

export const ForgotPasswordLink = styled(Link)({
  marginTop: '1.5rem',
  color: 'rgba(255, 255, 255, 0.4)',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  textDecoration: 'none',
  letterSpacing: '1px',
  cursor: 'pointer',
  '&:hover': { color: '#fff' }
});