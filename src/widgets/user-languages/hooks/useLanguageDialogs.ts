import { useState } from 'react';
import { LanguageProficiency } from '@/entities/languages/model/types';
import { LanguageDialogValue } from '@/features/language-dialog/LanguageDialog.types';
import { UseLanguageDialogsProps } from './useLanguageDialogs.types';

export const useLanguageDialogs = ({
    userId,
    addLanguage,
    updateLanguage,
    deleteLanguages,
}: UseLanguageDialogsProps) => {
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingLanguage, setEditingLanguage] =
        useState<LanguageProficiency | null>(null);

    const handleAddConfirm = async (value: LanguageDialogValue) => {
        await addLanguage({
            variables: {
                language: {
                    userId,
                    name: value.name,
                    proficiency: value.proficiency,
                },
            },
        });
        setAddOpen(false);
    };

    const openUpdate = (language: LanguageProficiency) => {
        setEditingLanguage(language);
        setUpdateOpen(true);
    };

    const handleUpdateConfirm = async (value: LanguageDialogValue) => {
        await updateLanguage({
            variables: {
                language: {
                    userId,
                    name: value.name,
                    proficiency: value.proficiency,
                },
            },
        });
        setUpdateOpen(false);
        setEditingLanguage(null);
    };

    const handleDeleteConfirm = async (names: string[]) => {
        await deleteLanguages({
            variables: {
                language: {
                    userId,
                    name: names,
                },
            },
        });
        setDeleteOpen(false);
    };

    const handleAddCancel = () => setAddOpen(false);

    const handleUpdateCancel = () => {
        setUpdateOpen(false);
        setEditingLanguage(null);
    };

    const handleDeleteCancel = () => setDeleteOpen(false);

    return {
        addOpen,
        setAddOpen,
        updateOpen,
        deleteOpen,
        setDeleteOpen,
        editingLanguage,
        handleAddConfirm,
        handleAddCancel,
        openUpdate,
        handleUpdateConfirm,
        handleUpdateCancel,
        handleDeleteConfirm,
        handleDeleteCancel,
    };
};