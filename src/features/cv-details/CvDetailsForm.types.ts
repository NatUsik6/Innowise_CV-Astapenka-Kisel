import { CvDetailsData, UpdateCvInput } from '@/entities/cv-details/api/types';

export interface FormValues {
    name: string;
    education: string;
    description: string;
}

export interface CvDetailsFormProps {
    cv: CvDetailsData;
    canEdit: boolean;
    loading: boolean;
    onSubmit: (values: Omit<UpdateCvInput, 'cvId'>) => Promise<void>;
}