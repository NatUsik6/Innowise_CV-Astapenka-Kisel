import { gql } from '@apollo/client';
import { CVS_QUERY } from './cvs.quries';
import { useMutation } from '@apollo/client/react';
import { DeleteCvInput, DeleteResult } from '../model/cvs.types';

const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;

export function useDeleteCv() {
  return useMutation<{ deleteCv: DeleteResult }, { cv: DeleteCvInput }>(DELETE_CV, {
    refetchQueries: [{ query: CVS_QUERY }],
    awaitRefetchQueries: true,
  });
}