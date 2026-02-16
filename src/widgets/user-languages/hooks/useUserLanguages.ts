import { useQuery, useMutation } from '@apollo/client/react';
import {
    GET_PROFILE_LANGUAGES,
    GET_LANGUAGES,
} from '@/entities/languages/api/queries';
import {
    ADD_PROFILE_LANGUAGE,
    DELETE_PROFILE_LANGUAGE,
    UPDATE_PROFILE_LANGUAGE,
} from '@/entities/languages/api/mutations';
import {
    ProfileLanguagesResult,
    LanguagesResult,
    AddProfileLanguageResult,
    UpdateProfileLanguageResult,
    DeleteProfileLanguageResult,
} from '@/entities/languages/api/types';

interface UseUserLanguagesProps {
    userId: string;
}

export const useUserLanguages = ({ userId }: UseUserLanguagesProps) => {
    const {
        data: profileData,
        loading: profileLoading,
        error: profileError,
    } = useQuery<ProfileLanguagesResult>(GET_PROFILE_LANGUAGES, {
        variables: { userId },
    });

    const { data: languagesData } = useQuery<LanguagesResult>(GET_LANGUAGES);

    const [addLanguage, { loading: adding }] =
        useMutation<AddProfileLanguageResult>(ADD_PROFILE_LANGUAGE, {
            refetchQueries: [
                { query: GET_PROFILE_LANGUAGES, variables: { userId } },
            ],
            awaitRefetchQueries: true,
        });

    const [updateLanguage] = useMutation<UpdateProfileLanguageResult>(
        UPDATE_PROFILE_LANGUAGE,
        {
            refetchQueries: [
                { query: GET_PROFILE_LANGUAGES, variables: { userId } },
            ],
            awaitRefetchQueries: true,
        }
    );

    const [deleteLanguages, { loading: deleting }] =
        useMutation<DeleteProfileLanguageResult>(DELETE_PROFILE_LANGUAGE, {
            refetchQueries: [
                { query: GET_PROFILE_LANGUAGES, variables: { userId } },
            ],
            awaitRefetchQueries: true,
        });

    return {
        profileLanguages: profileData?.profile?.languages ?? [],
        languagesData: languagesData?.languages ?? [],
        profileLoading,
        profileError,
        addLanguage,
        updateLanguage,
        deleteLanguages,
        adding,
        deleting,
    };
};