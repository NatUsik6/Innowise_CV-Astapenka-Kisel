import { Mastery } from '@/entities/skills/model/types';

export interface SkillOption {
    id: string;
    name: string;
    categoryId: string | null;
}

export interface SkillDialogValue {
    name: string;
    categoryId: string | null;
    mastery: Mastery;
}

export interface SkillDialogProps {
    open: boolean;
    mode: 'add' | 'update';
    skills: SkillOption[];
    assignedSkillNames?: string[];
    initialValue?: SkillDialogValue;
    onConfirm: (value: SkillDialogValue) => void;
    onCancel: () => void;
}
