import { gql } from "@apollo/client";
import { CVS_QUERY } from "./cvs.quries";
import { UpdateCvInput, CVAPI } from "../model/cvs.types";
import { useMutation } from "@apollo/client/react";

const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;

export function useUpdateCv() {
  return useMutation<{ updateCv: CVAPI }, { cv: UpdateCvInput }>(UPDATE_CV, {
    refetchQueries: [{ query: CVS_QUERY }],
    awaitRefetchQueries: true,
  });
}