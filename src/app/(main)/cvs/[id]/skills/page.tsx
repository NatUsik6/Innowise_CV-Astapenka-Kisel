'use client';

import { useParams } from 'next/navigation';
import { CvSkillsWidget } from '@/widgets/cv-skills/CvSkillsWidget';
import { useSession } from '@/entities/session/model/useSession';
import { Box, CircularProgress } from '@mui/material';
import { useCv } from './hooks/useCv';
import { useCanEdit } from '@/shared/hooks/useCanEdit';

export default function CvSkillsPage() {
    const { id: cvId } = useParams<{ id: string }>();
    const { user, loading: sessionLoading } = useSession();
    const { cv, loading: cvDataLoading } = useCv({ cvId });

    const canEdit = useCanEdit(cv?.user?.id, user);

    if (sessionLoading || cvDataLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    return <CvSkillsWidget cvId={cvId} canEdit={canEdit} />;
}
