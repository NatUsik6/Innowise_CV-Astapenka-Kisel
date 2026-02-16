import { SkillMastery } from '@/entities/skills/model/types';

interface CvWithSkills {
    id: string;
    skills: SkillMastery[];
}

type MutationResult<TKey extends string, TData> = Record<TKey, TData>;

export interface CvSkillsResult {
    cv: CvWithSkills;
}

export type AddCvSkillResult = MutationResult<'addCvSkill', CvWithSkills>;
export type UpdateCvSkillResult = MutationResult<'updateCvSkill', CvWithSkills>;
export type DeleteCvSkillResult = MutationResult<'deleteCvSkill', CvWithSkills>;
