'use client';

import { Tabs, Tab } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { tabsRootSx, tabItemSx } from '../../../widgets/user-profile/ui/UserProfileTabs.styles';

export const CvTabs = ({ cvId }: { cvId: string }) => {
    const pathname = usePathname();
    const router = useRouter();

    const value = pathname.split('/').pop();

    return (
        <Tabs
            value={value}
            onChange={(_, v) => router.push(`/cvs/${cvId}/${v}`)}
            sx={tabsRootSx}
        >
            {['details', 'skills', 'projects', 'preview'].map(tab => (
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
