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
import { useSession } from "@/entities/session/model/useSession";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const displayName = user?.profile?.firstName 
    ? `${user.profile.firstName} ${user.profile.lastName || ''}`.trim()
    : user?.email;

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
          <NavItem 
            selected={pathname === ROUTES.USERS}
            onClick={() => router.push(ROUTES.USERS)}
          >
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
            <NavItem 
              selected={pathname === ROUTES.CVS} 
              onClick={() => router.push(ROUTES.CVS)}
            >
              <ListItemIcon><ContactPageIcon /></ListItemIcon>
              <ListItemText primary="CVs" />
            </NavItem>
          </List>
        </Box>
        <Box>
          {user && (
            <UserSection>
              <UserAvatar>{displayName?.[0]?.toUpperCase()}</UserAvatar>
              <UserName variant="body2">{displayName}</UserName>
            </UserSection>
          )}
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
