'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, CircularProgress } from '@mui/material';

import {
    formContainerSx,
    submitWrapperSx,
    loaderSx,
} from './CvDetailsForm.styles';
import { updateButtonSx } from './CvDetailsForm.styles';
import { StyledTextField } from '@/shared/ui/users/inputs/StyledTextField';
import type { FormValues, CvDetailsFormProps } from './CvDetailsForm.types';
export const CvDetailsForm = ({
    cv,
    canEdit,
    loading,
    onSubmit,
}: CvDetailsFormProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            name: cv.name,
            education: cv.education ?? '',
            description: cv.description,
        },
    });

    useEffect(() => {
        reset({
            name: cv.name,
            education: cv.education ?? '',
            description: cv.description,
        });
    }, [cv, reset]);

    const handleFormSubmit = async (values: FormValues) => {
        await onSubmit({
            name: values.name,
            education: values.education || null,
            description: values.description,
        });

        reset(values);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={formContainerSx}
        >
            <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                    <StyledTextField
                        {...field}
                        label="Name"
                        disabled={!canEdit}
                        focusVariant='danger'
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
            />

            <Controller
                name="education"
                control={control}
                render={({ field }) => (
                    <StyledTextField
                        {...field}
                        label="Education"
                        disabled={!canEdit}
                        focusVariant='danger'
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                    <StyledTextField
                        {...field}
                        label="Description"
                        disabled={!canEdit}
                        multiline
                        minRows={6}
                        focusVariant='danger'
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                )}
            />

            {canEdit && (
                <Box sx={submitWrapperSx}>
                    <Button
                        type="submit"
                        disabled={loading || !isDirty}
                        sx={updateButtonSx(isDirty)}
                    >
                        {loading ? (
                            <CircularProgress size={20} sx={loaderSx} />
                        ) : (
                            'Update'
                        )}
                    </Button>
                </Box>
            )}
        </Box>
    );
};
