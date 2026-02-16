'use client';

import { useState } from 'react';
import { useUpdateCv } from './hooks/useUpdateCv';
import { CvDetailsForm } from './CvDetailsForm';
import type { UpdateCvInput } from '@/entities/cv-details/api/types';
import { useCv } from '@/app/(main)/cvs/[id]/details/hooks/useCv';
import { ActionSnackbar } from '@/shared/ui/users/ActionSnackbar/ActionSnackbar';

export const CvDetailsWidget = ({ cvId, canEdit }: CvDetailsWidgetProps) => {
    const { cv, error: queryError } = useCv({ cvId });
    const { handleUpdate, loading } = useUpdateCv();

    const [snackbar, setSnackbar] = useState<{
        message: string;
        severity: 'success' | 'error';
    } | null>(null);

    if (queryError) {
        return (
            <ActionSnackbar
                message={queryError.message}
                severity="error"
                onClose={() => { }}
            />
        );
    }

    if (!cv) return null;

    const handleSubmit = async (values: Omit<UpdateCvInput, 'cvId'>) => {
        const result = await handleUpdate({ cvId, ...values });

        setSnackbar(
            result.success
                ? { message: 'CV updated successfully', severity: 'success' }
                : { message: result.error?.message ?? 'Something went wrong', severity: 'error' },
        );
    };

    return (
        <>
            <CvDetailsForm
                cv={cv}
                canEdit={canEdit}
                loading={loading}
                onSubmit={handleSubmit}
            />

            {snackbar && (
                <ActionSnackbar
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={() => setSnackbar(null)}
                />
            )}
        </>
    );
};
