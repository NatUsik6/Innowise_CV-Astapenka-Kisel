import { SkillMastery, Skill, SkillCategory } from '../model/types';

export interface ProfileSkillsResult {
  profile: {
    id: string;
    skills: SkillMastery[];
  };
}

export interface SkillsResult {
  skills: Skill[];
}

export interface SkillCategoriesResult {
  skillCategories: SkillCategory[];
}

export interface AddProfileSkillResult {
  addProfileSkill: {
    id: string;
    skills: SkillMastery[];
  };
}

export interface UpdateProfileSkillResult {
  updateProfileSkill: {
    id: string;
    skills: SkillMastery[];
  };
}

export interface DeleteProfileSkillResult {
  deleteProfileSkill: {
    id: string;
    skills: SkillMastery[];
  };
}
