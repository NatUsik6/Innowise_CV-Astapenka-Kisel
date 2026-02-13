import { Mastery } from '@/entities/skills/model/types';

export interface SkillEntry {
    name: string;
    mastery: Mastery;
}

export interface SkillGroup {
    categoryName: string;
    skills: SkillEntry[];
}

export interface DeleteSkillsDialogProps {
    open: boolean;
    skillGroups: SkillGroup[];
    onConfirm: (skillNames: string[]) => void;
    onCancel: () => void;
}
