import { SkillMastery, Skill, SkillCategory } from '../model/types';

interface ProfileWithSkills {
  id: string;
  skills: SkillMastery[];
}

type MutationResult<TKey extends string, TData> = Record<TKey, TData>

export interface ProfileSkillsResult {
  profile: ProfileWithSkills;
}

export interface SkillsResult {
  skills: Skill[];
}

export interface SkillCategoriesResult {
  skillCategories: SkillCategory[];
}

export type AddProfileSkillResult = MutationResult<'addProfileSkill', ProfileWithSkills>;

export type UpdateProfileSkillResult = MutationResult<'updateProfileSkill', ProfileWithSkills>;

export type DeleteProfileSkillResult = MutationResult<'deleteProfileSkill', ProfileWithSkills>;
