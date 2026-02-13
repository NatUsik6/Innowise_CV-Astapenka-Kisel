export enum Proficiency {
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
    Native = 'Native',
}

export interface Language {
    id: string;
    created_at: string;
    iso2: string;
    name: string;
    native_name?: string | null;
}

export interface LanguageProficiency {
    name: string;
    proficiency: Proficiency;
}

interface BaseLanguageInput {
    userId: string;
    name: string;
}

export interface AddProfileLanguageInput extends BaseLanguageInput {
    proficiency: Proficiency;
}

export type UpdateProfileLanguageInput = AddProfileLanguageInput;

export interface DeleteProfileLanguageInput extends Pick<BaseLanguageInput, 'userId'> {
    name: string[];
}