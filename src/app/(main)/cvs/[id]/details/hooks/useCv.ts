'use client';

import { GET_CV } from '@/entities/cv-details/api/queries';
import { GetCvQuery, GetCvQueryVariables } from '@/entities/cv-details/api/types';
import { useQuery } from '@apollo/client/react';

export const useCv = ({ cvId }: GetCvQueryVariables) => {
    const { data, loading, error } = useQuery<GetCvQuery, GetCvQueryVariables>(GET_CV, {
        variables: { cvId },
        fetchPolicy: 'cache-and-network',
    });

    return {
        cv: data?.cv ?? null,
        loading,
        error,
    };
};
