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

type AddSkillMutation = (options: {
    variables: {
        skill: AddCvSkillInput;
    };
}) => Promise<FetchResult<AddCvSkillResult>>;

type UpdateSkillMutation = (options: {
    variables: {
        skill: UpdateCvSkillInput;
    };
}) => Promise<FetchResult<UpdateCvSkillResult>>;

type DeleteSkillsMutation = (options: {
    variables: {
        skill: DeleteCvSkillInput;
    };
}) => Promise<FetchResult<DeleteCvSkillResult>>;

export interface UseCvSkillDialogsProps {
    cvId: string;
    addSkill: AddSkillMutation;
    updateSkill: UpdateSkillMutation;
    deleteSkills: DeleteSkillsMutation;
}

export interface UseCvSkillDialogsReturn {
    addOpen: boolean;
    setAddOpen: (open: boolean) => void;
    updateOpen: boolean;
    deleteOpen: boolean;
    setDeleteOpen: (open: boolean) => void;
    editingSkill: SkillMastery | null;
    handleAddConfirm: (value: { name: string; categoryId: string | null; mastery: Mastery }) => Promise<void>;
    handleAddCancel: () => void;
    openUpdate: (skill: SkillMastery) => void;
    handleUpdateConfirm: (value: { name: string; categoryId: string | null; mastery: Mastery }) => Promise<void>;
    handleUpdateCancel: () => void;
    handleDeleteConfirm: (names: string[]) => Promise<void>;
    handleDeleteCancel: () => void;
}
