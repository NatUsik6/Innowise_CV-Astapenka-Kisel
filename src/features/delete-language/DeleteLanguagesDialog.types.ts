import { Proficiency } from '@/entities/languages/model/types';

export interface LanguageEntry {
    name: string;
    proficiency: Proficiency;
}

export interface DeleteLanguagesDialogProps {
    open: boolean;
    languages: LanguageEntry[];
    onConfirm: (languageNames: string[]) => void;
    onCancel: () => void;
}