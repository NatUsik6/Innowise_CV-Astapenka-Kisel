import { Proficiency } from '@/entities/languages/model/types';

export interface LanguageOption {
    id: string;
    name: string;
    native_name?: string | null;
}

export interface LanguageDialogValue {
    name: string;
    proficiency: Proficiency;
}

export interface LanguageDialogProps {
    open: boolean;
    mode: 'add' | 'update';
    languages: LanguageOption[];
    assignedLanguageNames?: string[];
    initialValue?: LanguageDialogValue;
    onConfirm: (value: LanguageDialogValue) => void;
    onCancel: () => void;
}
