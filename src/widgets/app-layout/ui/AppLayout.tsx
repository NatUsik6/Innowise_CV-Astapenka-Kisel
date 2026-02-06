"use client";

import React, { useEffect, useState } from "react";
import { List, ListItemIcon, ListItemText, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import MovingIcon from "@mui/icons-material/Moving";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import TranslateIcon from "@mui/icons-material/Translate";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  RootWrapper,
  SidebarWrapper,
  MainContent,
  NavItem,
  UserSection,
  UserAvatar,
  BottomActions,
  BackButton,
  UserName,
} from "./AppLayout.styles";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }
  return (
    <RootWrapper>
      <SidebarWrapper>
        <Box>
          <List sx={{ p: 0 }}>
            <NavItem selected>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </NavItem>
            <NavItem>
              <ListItemIcon>
                <MovingIcon />
              </ListItemIcon>
              <ListItemText primary="Skills" />
            </NavItem>
            <NavItem>
              <ListItemIcon>
                <TranslateIcon />
              </ListItemIcon>
              <ListItemText primary="Languages" />
            </NavItem>
            <NavItem>
              <ListItemIcon>
                <ContactPageIcon />
              </ListItemIcon>
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

      <MainContent>{children}</MainContent>
    </RootWrapper>
  );
};
