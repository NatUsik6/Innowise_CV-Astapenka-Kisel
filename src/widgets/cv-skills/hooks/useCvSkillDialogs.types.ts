import { FetchResult } from '@apollo/client';
import { SkillMastery, Mastery } from '@/entities/skills/model/types';
import {
    AddCvSkillResult,
    UpdateCvSkillResult,
    DeleteCvSkillResult,
} from '@/entities/cv-skills/api/types';
import {
    AddCvSkillInput,
    UpdateCvSkillInput,
    DeleteCvSkillInput,
} from '@/entities/cv-skills/model/types';

type MutationFn<TInput, TResult> = (options: {
    variables: { skill: TInput };
}) => Promise<FetchResult<TResult>>;

export interface UseCvSkillDialogsProps {
    cvId: string;
    addSkill: MutationFn<AddCvSkillInput, AddCvSkillResult>;
    updateSkill: MutationFn<UpdateCvSkillInput, UpdateCvSkillResult>;
    deleteSkills: MutationFn<DeleteCvSkillInput, DeleteCvSkillResult>;
}

type SkillDialogValue = {
    name: string;
    categoryId: string | null;
    mastery: Mastery;
};

export interface UseCvSkillDialogsReturn {
    addOpen: boolean;
    setAddOpen: (open: boolean) => void;
    updateOpen: boolean;
    deleteOpen: boolean;
    setDeleteOpen: (open: boolean) => void;
    editingSkill: SkillMastery | null;
    handleAddConfirm: (value: SkillDialogValue) => Promise<void>;
    handleAddCancel: () => void;
    openUpdate: (skill: SkillMastery) => void;
    handleUpdateConfirm: (value: SkillDialogValue) => Promise<void>;
    handleUpdateCancel: () => void;
    handleDeleteConfirm: (names: string[]) => Promise<void>;
    handleDeleteCancel: () => void;
}
