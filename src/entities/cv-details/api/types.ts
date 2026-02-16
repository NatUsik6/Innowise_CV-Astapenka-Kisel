export interface CvDetailsData {
    id: string;
    name: string;
    education?: string | null;
    description: string;
    user?: { id: string } | null;
}

export type UpdateCvInput = Pick<CvDetailsData, 'name' | 'education' | 'description'> & {
    cvId: string;
};

export interface GetCvQuery {
    cv: CvDetailsData;
}

export type GetCvQueryVariables = {
    cvId: string;
};

export interface UpdateCvMutation {
    updateCv: Pick<CvDetailsData, 'id' | 'name' | 'education' | 'description'>;
}

export type UpdateCvMutationVariables = {
    cv: UpdateCvInput;
};