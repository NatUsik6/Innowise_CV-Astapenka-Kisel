import { FetchResult } from '@apollo/client';
import { LanguageProficiency } from '@/entities/languages/model/types';
import {
    AddProfileLanguageResult,
    UpdateProfileLanguageResult,
    DeleteProfileLanguageResult,
} from '@/entities/languages/api/types';
import {
    AddProfileLanguageInput,
    UpdateProfileLanguageInput,
    DeleteProfileLanguageInput,
} from '@/entities/languages/model/types';

type AddLanguageMutation = (options: {
    variables: {
        language: AddProfileLanguageInput;
    };
}) => Promise<FetchResult<AddProfileLanguageResult>>;

type UpdateLanguageMutation = (options: {
    variables: {
        language: UpdateProfileLanguageInput;
    };
}) => Promise<FetchResult<UpdateProfileLanguageResult>>;

type DeleteLanguagesMutation = (options: {
    variables: {
        language: DeleteProfileLanguageInput;
    };
}) => Promise<FetchResult<DeleteProfileLanguageResult>>;

export interface UseLanguageDialogsProps {
    userId: string;
    addLanguage: AddLanguageMutation;
    updateLanguage: UpdateLanguageMutation;
    deleteLanguages: DeleteLanguagesMutation;
}

export interface UseLanguageDialogsReturn {
    addOpen: boolean;
    setAddOpen: (open: boolean) => void;
    updateOpen: boolean;
    deleteOpen: boolean;
    setDeleteOpen: (open: boolean) => void;
    editingLanguage: LanguageProficiency | null;
    handleAddConfirm: (value: { name: string; proficiency: string }) => Promise<void>;
    handleAddCancel: () => void;
    openUpdate: (language: LanguageProficiency) => void;
    handleUpdateConfirm: (value: { name: string; proficiency: string }) => Promise<void>;
    handleUpdateCancel: () => void;
    handleDeleteConfirm: (names: string[]) => Promise<void>;
    handleDeleteCancel: () => void;
}
