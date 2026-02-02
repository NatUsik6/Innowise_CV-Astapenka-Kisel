'use client';

import { Tabs, Tab } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

export const UserProfileTabs = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const value = pathname.split('/').pop();

  return (
    <Tabs
      value={value}
      onChange={(_, v) => router.push(`/users/${userId}/${v}`)}
      sx={{
        mt: 4,
        '& .MuiTabs-indicator': {
          backgroundColor: '#E53935',
          height: 2,
        },
      }}
    >
      {['profile', 'skills', 'languages'].map(tab => (
        <Tab
          key={tab}
          value={tab}
          label={tab.toUpperCase()}
          sx={{
            color: '#fff',
            fontWeight: 500,
            '&.Mui-selected': {
              color: '#E53935',
            },
          }}
        />
      ))}
    </Tabs>
  );
};
