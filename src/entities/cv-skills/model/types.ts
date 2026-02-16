import { Mastery } from '@/entities/skills/model/types';

interface BaseCvSkillInput {
    cvId: string;
    name: string;
}

export interface AddCvSkillInput extends BaseCvSkillInput {
    categoryId?: string | null;
    mastery: Mastery;
}

export type UpdateCvSkillInput = AddCvSkillInput;

export interface DeleteCvSkillInput extends Pick<BaseCvSkillInput, 'cvId'> {
    name: string[];
}
