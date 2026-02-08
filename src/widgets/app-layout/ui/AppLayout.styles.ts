import { styled } from '@mui/material/styles';
import { Avatar, Box, IconButton, ListItemButton, Typography } from '@mui/material';

export const RootWrapper = styled(Box)({
  display: 'flex',
  height: '100vh',
  backgroundColor: 'rgba(53, 53, 53, 1)',
  color: 'rgba(255, 255, 255, 1)',
});

export const SidebarWrapper = styled(Box)({
  width: '12.5rem',
  backgroundColor: 'rgba(53, 53, 53, 1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '2.75rem 0 1rem 0',
});

export const NavItem = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: '1rem',
  marginBottom: '0.875rem',
  minHeight: '3rem',
  color: 'rgba(255, 255, 255, 0.7)',
  borderTopRightRadius: '1.5rem',
  borderBottomRightRadius: '1.5rem',
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '& .MuiListItemIcon-root': {
      color: 'rgba(255, 255, 255, 1)',
    }
  },
  
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

export const MainContent = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '0 1.5rem',
  backgroundColor: 'rgba(53, 53, 53, 1)',
});

export const UserSection = styled(Box)({
  padding: '0 1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.875rem',
  marginBottom: '0.875rem',
});

export const UserName = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 1)',
});

export const UserAvatar = styled(Avatar)({
  backgroundColor: '#c62828',
  width: '2rem',
  height: '2rem',
  fontSize: '0.8rem',
});

export const BottomActions = styled(Box)({
  padding: '0 1rem',
});

export const BackButton = styled(IconButton)({
  color: 'rgba(255, 255, 255, 0.7)',
  padding: 0,
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
});