import { FetchResult } from '@apollo/client';
import { SkillMastery } from '@/entities/skills/model/types';
import {
    AddProfileSkillResult,
    UpdateProfileSkillResult,
    DeleteProfileSkillResult,
} from '@/entities/skills/api/types';
import {
    AddProfileSkillInput,
    UpdateProfileSkillInput,
    DeleteProfileSkillInput,
} from '@/entities/skills/model/types';

type AddSkillMutation = (options: {
    variables: {
        skill: AddProfileSkillInput;
    };
}) => Promise<FetchResult<AddProfileSkillResult>>;

type UpdateSkillMutation = (options: {
    variables: {
        skill: UpdateProfileSkillInput;
    };
}) => Promise<FetchResult<UpdateProfileSkillResult>>;

type DeleteSkillsMutation = (options: {
    variables: {
        skill: DeleteProfileSkillInput;
    };
}) => Promise<FetchResult<DeleteProfileSkillResult>>;

export interface UseSkillDialogsProps {
    userId: string;
    addSkill: AddSkillMutation;
    updateSkill: UpdateSkillMutation;
    deleteSkills: DeleteSkillsMutation;
}

export interface UseSkillDialogsReturn {
    addOpen: boolean;
    setAddOpen: (open: boolean) => void;
    updateOpen: boolean;
    deleteOpen: boolean;
    setDeleteOpen: (open: boolean) => void;
    editingSkill: SkillMastery | null;
    handleAddConfirm: (value: { name: string; categoryId: string | null; mastery: string }) => Promise<void>;
    handleAddCancel: () => void;
    openUpdate: (skill: SkillMastery) => void;
    handleUpdateConfirm: (value: { name: string; categoryId: string | null; mastery: string }) => Promise<void>;
    handleUpdateCancel: () => void;
    handleDeleteConfirm: (names: string[]) => Promise<void>;
    handleDeleteCancel: () => void;
}
