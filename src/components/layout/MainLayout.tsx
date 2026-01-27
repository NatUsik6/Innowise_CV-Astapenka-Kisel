'use client';

import React from 'react';
import { List, ListItemIcon, ListItemText, Typography, Box, Avatar, IconButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MovingIcon from '@mui/icons-material/Moving';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import TranslateIcon from '@mui/icons-material/Translate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { RootWrapper, SidebarWrapper, MainContent, NavItem } from './StyledLayout';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootWrapper>
      <SidebarWrapper>
        <Box>
          <List sx={{ p: 0 }}>
            <NavItem selected>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Employees" />
            </NavItem>
            <NavItem>
              <ListItemIcon><MovingIcon /></ListItemIcon>
              <ListItemText primary="Skills" />
            </NavItem>
            <NavItem>
              <ListItemIcon><TranslateIcon /></ListItemIcon>
              <ListItemText primary="Languages" />
            </NavItem>
            <NavItem>
              <ListItemIcon><ContactPageIcon /></ListItemIcon>
              <ListItemText primary="CVs" />
            </NavItem>
          </List>
        </Box>

        <Box>
          <Box sx={{ 
            p: '0 1rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.875rem',
            mb: '0.875rem'
          }}>
            <Avatar sx={{ bgcolor: '#c62828', width: '2rem', height: '2rem', fontSize: '0.8rem' }}>R</Avatar>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Rostislav Harlanov
            </Typography>
          </Box>
          
          <Box sx={{ px: '16px' }}>
            <IconButton 
              size="small" 
              sx={{ color: 'rgba(255, 255, 255, 0.7)', p: 0 }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Box>
        </Box>
      </SidebarWrapper>

      <MainContent>
        {children}
      </MainContent>
    </RootWrapper>
  );
};