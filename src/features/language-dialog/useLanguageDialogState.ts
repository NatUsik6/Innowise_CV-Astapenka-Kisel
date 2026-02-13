import { useEffect, useState } from 'react';
import { Proficiency } from '@/entities/languages/model/types';
import { LanguageDialogValue } from './LanguageDialog.types';

export const useLanguageDialogState = (
    open: boolean,
    initialValue?: LanguageDialogValue
) => {
    const [languageName, setLanguageName] = useState('');
    const [proficiency, setProficiency] = useState<Proficiency>(Proficiency.A1);

    useEffect(() => {
        if (open) {
            setLanguageName(initialValue?.name ?? '');
            setProficiency(initialValue?.proficiency ?? Proficiency.A1);
        }
    }, [open, initialValue]);

    const isValid = Boolean(languageName && proficiency);

    return {
        languageName,
        setLanguageName,
        proficiency,
        setProficiency,
        isValid,
    };
};