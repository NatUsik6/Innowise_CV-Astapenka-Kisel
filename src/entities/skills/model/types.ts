export enum Mastery {
  Novice = 'Novice',
  Advanced = 'Advanced',
  Competent = 'Competent',
  Proficient = 'Proficient',
  Expert = 'Expert',
}

export interface SkillCategory {
  id: string;
  name: string;
  order: number;
  parent?: SkillCategory | null;
  children: SkillCategory[];
}

export interface Skill {
  id: string;
  created_at: string;
  name: string;
  category?: SkillCategory | null;
  category_name?: string | null;
  category_parent_name?: string | null;
}

export interface SkillMastery {
  name: string;
  categoryId?: string | null;
  mastery: Mastery;
}

export interface AddProfileSkillInput {
  userId: string;
  name: string;
  categoryId?: string | null;
  mastery: Mastery;
}

export interface UpdateProfileSkillInput {
  userId: string;
  name: string;
  categoryId?: string | null;
  mastery: Mastery;
}

export interface DeleteProfileSkillInput {
  userId: string;
  name: string[];
}
