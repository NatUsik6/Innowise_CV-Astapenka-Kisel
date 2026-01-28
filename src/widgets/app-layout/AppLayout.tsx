'use client';

import React from 'react';
import { List, ListItemIcon, ListItemText, Typography, Box, Avatar, IconButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MovingIcon from '@mui/icons-material/Moving';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import TranslateIcon from '@mui/icons-material/Translate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { RootWrapper, SidebarWrapper, MainContent, NavItem, UserSection, UserAvatar, BottomActions, BackButton, UserName } from './StyledLayout';

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
          <UserSection>
            <UserAvatar>R</UserAvatar>
            <UserName variant="body2">Rostislav Harlanov</UserName>
          </UserSection>
          <BottomActions>
            <BackButton size="small">
              <ArrowBackIosNewIcon />
            </BackButton>
          </BottomActions>
        </Box>
      </SidebarWrapper>

      <MainContent>
        {children}
      </MainContent>
    </RootWrapper>
  );
};