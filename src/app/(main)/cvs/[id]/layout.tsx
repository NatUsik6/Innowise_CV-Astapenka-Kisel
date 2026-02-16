'use client';

import { ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams, usePathname } from 'next/navigation';

import { CvTabs } from '@/widgets/cv-details/ui/CvTabs';
import { CvBreadcrumb } from '@/widgets/cv-breadcrumb/ui/CvBreadcrumb';
import { useCv } from './details/hooks/useCv';

export default function CvLayout({ children }: { children: ReactNode }) {
    const { id: cvId } = useParams<{ id: string }>();
    const pathname = usePathname();
    const { cv, loading } = useCv({ cvId });

    const currentPage = pathname.split('/').pop();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    if (!cv) return null;

    return (
        <Box px={6} py={1}>
            <CvBreadcrumb
                cvId={cvId}
                cvName={cv.name}
                currentPage={currentPage}
            />
            <CvTabs cvId={cvId} />
            <Box mt={4}>{children}</Box>
        </Box>
    );
}
