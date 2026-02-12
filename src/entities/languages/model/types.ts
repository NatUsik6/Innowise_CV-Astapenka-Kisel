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

export interface AddProfileLanguageInput {
    userId: string;
    name: string;
    proficiency: Proficiency;
}

export interface UpdateProfileLanguageInput {
    userId: string;
    name: string;
    proficiency: Proficiency;
}

export interface DeleteProfileLanguageInput {
    userId: string;
    name: string[];
}