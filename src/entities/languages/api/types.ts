import { LanguageProficiency, Language } from '../model/types';

export interface ProfileLanguagesResult {
    profile: {
        id: string;
        languages: LanguageProficiency[];
    };
}

export interface LanguagesResult {
    languages: Language[];
}

export interface AddProfileLanguageResult {
    addProfileLanguage: {
        id: string;
        languages: LanguageProficiency[];
    };
}

export interface UpdateProfileLanguageResult {
    updateProfileLanguage: {
        id: string;
        languages: LanguageProficiency[];
    };
}

export interface DeleteProfileLanguageResult {
    deleteProfileLanguage: {
        id: string;
        languages: LanguageProficiency[];
    };
}