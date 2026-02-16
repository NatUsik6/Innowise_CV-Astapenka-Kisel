import { useQuery, useMutation } from '@apollo/client/react';
import { GET_CV_SKILLS } from '@/entities/cv-skills/api/queries';
import { GET_SKILLS } from '@/entities/skills/api/queries';
import { ADD_CV_SKILL, DELETE_CV_SKILL, UPDATE_CV_SKILL } from '@/entities/cv-skills/api/mutations';
import {
    CvSkillsResult,
    AddCvSkillResult,
    UpdateCvSkillResult,
    DeleteCvSkillResult,
} from '@/entities/cv-skills/api/types';
import { SkillsResult } from '@/entities/skills/api/types';

interface UseCvSkillsProps {
    cvId: string;
}

export const useCvSkills = ({ cvId }: UseCvSkillsProps) => {
    const {
        data: cvData,
        loading: cvLoading,
        error: cvError,
    } = useQuery<CvSkillsResult>(GET_CV_SKILLS, {
        variables: { cvId },
    });

    const { data: skillsData } = useQuery<SkillsResult>(GET_SKILLS);

    const [addSkill, { loading: adding }] = useMutation<AddCvSkillResult>(
        ADD_CV_SKILL,
        {
            refetchQueries: [{ query: GET_CV_SKILLS, variables: { cvId } }],
            awaitRefetchQueries: true,
        }
    );

    const [updateSkill] = useMutation<UpdateCvSkillResult>(
        UPDATE_CV_SKILL,
        {
            refetchQueries: [{ query: GET_CV_SKILLS, variables: { cvId } }],
            awaitRefetchQueries: true,
        }
    );

    const [deleteSkills, { loading: deleting }] = useMutation<DeleteCvSkillResult>(
        DELETE_CV_SKILL,
        {
            refetchQueries: [{ query: GET_CV_SKILLS, variables: { cvId } }],
            awaitRefetchQueries: true,
        }
    );

    return {
        cvSkills: cvData?.cv?.skills ?? [],
        skillsData: skillsData?.skills ?? [],
        cvLoading,
        cvError,
        addSkill,
        updateSkill,
        deleteSkills,
        adding,
        deleting,
    };
};
