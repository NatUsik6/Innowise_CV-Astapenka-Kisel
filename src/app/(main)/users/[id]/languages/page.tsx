'use client';

import { useParams } from 'next/navigation';
import { UserLanguagesWidget } from '@/widgets/user-languages/UserLanguagesWidget';
import { Box, CircularProgress } from '@mui/material';
import { useSession } from '@/entities/session/model/useSession';
import { useCanEditLanguages } from './hooks/useCanEditLanguages';

export default function UserLanguagesPage() {
    const { id: userId } = useParams<{ id: string }>();
    const { user, loading } = useSession();
    const canEdit = useCanEditLanguages(userId, user);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    return <UserLanguagesWidget userId={userId} canEdit={canEdit} />;
}