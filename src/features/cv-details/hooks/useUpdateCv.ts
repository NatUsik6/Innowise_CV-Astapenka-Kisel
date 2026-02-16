'use client';

import { useMutation } from '@apollo/client/react';
import { UPDATE_CV } from '@/entities/cv-details/api/queries';
import type { UpdateCvInput, UpdateCvMutation, UpdateCvMutationVariables } from '@/entities/cv-details/api/types';

export const useUpdateCv = () => {
  const [updateCv, { loading }] = useMutation<
    UpdateCvMutation,
    UpdateCvMutationVariables
  >(UPDATE_CV);

  const handleUpdate = async (input: UpdateCvInput) => {
    try {
      await updateCv({ variables: { cv: input } });
      return { success: true as const };
    } catch (error) {
      return { success: false as const, error: error as Error };
    }
  };

  return { handleUpdate, loading };
};
