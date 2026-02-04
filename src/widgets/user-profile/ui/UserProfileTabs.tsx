'use client';

import { Tabs, Tab } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import {
  tabsRootSx,
  tabItemSx,
} from './UserProfileTabs.styles';

export const UserProfileTabs = ({
  userId,
}: {
  userId: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const value = pathname.split('/').pop();

  return (
    <Tabs
      value={value}
      onChange={(_, v) =>
        router.push(`/users/${userId}/${v}`)
      }
      sx={tabsRootSx}
    >
      {['profile', 'skills', 'languages'].map(tab => (
        <Tab
          key={tab}
          value={tab}
          label={tab.toUpperCase()}
          sx={tabItemSx}
        />
      ))}
    </Tabs>
  );
};
