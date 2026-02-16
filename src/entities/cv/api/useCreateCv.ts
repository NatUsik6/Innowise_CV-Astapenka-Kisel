import { gql } from "@apollo/client";
import { CreateCvInput, CVAPI } from "../model/cvs.types";
import { useMutation } from "@apollo/client/react";
import { CVS_QUERY } from "./cvs.quries";

type CreateCvArgs = {
  cv: CreateCvInput;
};

type CreateCvResult = {
  createCv: CVAPI;
};

const CREATE_CV = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`;

export function useCreateCv() {
  return useMutation<CreateCvResult, CreateCvArgs>(CREATE_CV, {
    refetchQueries: [{ query: CVS_QUERY }],
    awaitRefetchQueries: true,
    update(cache, { data }) {
      if (data?.createCv) {
        cache.evict({ fieldName: 'cvs' });
        cache.gc();
      }
    },
  });
}