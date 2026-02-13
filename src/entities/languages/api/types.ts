import { LanguageProficiency, Language } from '../model/types';

interface ProfileWithLanguages {
    id: string;
    languages: LanguageProficiency[];
}

type MutationResult<TKey extends string, TData> = Record<TKey, TData>;

export interface ProfileLanguagesResult {
    profile: ProfileWithLanguages;
}

export interface LanguagesResult {
    languages: Language[];
}

export type AddProfileLanguageResult = MutationResult<'addProfileLanguage', ProfileWithLanguages>;

export type UpdateProfileLanguageResult = MutationResult<'updateProfileLanguage', ProfileWithLanguages>;

export type DeleteProfileLanguageResult = MutationResult<'deleteProfileLanguage', ProfileWithLanguages>;