import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useMemo } from 'react';

import { Language } from '@/entities/languages/model/types';
import { DeleteLanguagesDialog } from '@/features/delete-language/DeleteLanguagesDialog';
import { LanguageDialog, LanguageOption } from '@/features/language-dialog/LanguageDialog';
import { useUserLanguages } from './hooks/useUserLanguages';
import { useLanguageDialogs } from './hooks/useLanguageDialogs';
import * as styles from './UserLanguagesWidget.styles';
import { LanguageProficiencyBar } from '@/features/language-proficiency/LanguageProficiencyBar';

interface UserLanguagesWidgetProps {
    userId: string;
    canEdit: boolean;
}

export const UserLanguagesWidget = ({
    userId,
    canEdit,
}: UserLanguagesWidgetProps) => {
    const {
        profileLanguages,
        languagesData,
        profileLoading,
        profileError,
        addLanguage,
        updateLanguage,
        deleteLanguages,
        adding,
        deleting,
    } = useUserLanguages({ userId });

    const {
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
    } = useLanguageDialogs({ userId, addLanguage, updateLanguage, deleteLanguages });

    const assignedNames = profileLanguages.map((l) => l.name);

    const languageOptions: LanguageOption[] = useMemo(
        () =>
            languagesData.map((l: Language) => ({
                id: l.id,
                name: l.name,
                native_name: l.native_name,
            })),
        [languagesData]
    );

    if (profileLoading) {
        return (
            <Box sx={styles.loaderWrapperSx}>
                <CircularProgress sx={styles.loaderSx} />
            </Box>
        );
    }

    if (profileError) {
        return <Alert severity="error">Failed to load languages.</Alert>;
    }

    return (
        <Box sx={styles.containerSx}>
            {profileLanguages.length === 0 ? (
                <Typography sx={styles.emptyTextSx}>No languages added yet.</Typography>
            ) : (
                <Box sx={styles.languagesGridSx}>
                    {profileLanguages.map((language) => (
                        <LanguageProficiencyBar
                            key={language.name}
                            name={language.name}
                            proficiency={language.proficiency}
                            readonly={!canEdit}
                            onClick={() => openUpdate(language)}
                        />
                    ))}
                </Box>
            )}

            {canEdit && (
                <Box sx={styles.actionsWrapperSx}>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() => setAddOpen(true)}
                        disabled={adding}
                        sx={styles.addButtonSx}
                    >
                        Add language
                    </Button>

                    <Button
                        startIcon={<DeleteOutlineIcon sx={{ color: '#e53935' }} />}
                        onClick={() => setDeleteOpen(true)}
                        disabled={profileLanguages.length === 0 || deleting}
                        sx={styles.deleteButtonSx}
                    >
                        Remove languages
                    </Button>
                </Box>
            )}

            <LanguageDialog
                open={addOpen}
                mode="add"
                languages={languageOptions}
                assignedLanguageNames={assignedNames}
                onConfirm={handleAddConfirm}
                onCancel={handleAddCancel}
            />

            <LanguageDialog
                open={updateOpen}
                mode="update"
                languages={languageOptions}
                initialValue={
                    editingLanguage
                        ? {
                            name: editingLanguage.name,
                            proficiency: editingLanguage.proficiency,
                        }
                        : undefined
                }
                onConfirm={handleUpdateConfirm}
                onCancel={handleUpdateCancel}
            />

            <DeleteLanguagesDialog
                open={deleteOpen}
                languages={profileLanguages}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </Box>
    );
};