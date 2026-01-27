import { styled } from '@mui/material/styles';
import { Box, ListItemButton } from '@mui/material';

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