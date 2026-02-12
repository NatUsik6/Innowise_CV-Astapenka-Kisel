import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Proficiency } from '@/entities/languages/model/types';
import { getProficiencyColor } from '@/entities/languages/model/getProficiencyColor';
import {
    dialogPaperSx,
    dialogTitleSx,
    closeIconSx,
    dialogContentSx,
    languagesGridSx,
    dialogActionsSx,
    cancelButtonSx,
    deleteButtonSx,
    counterBadgeSx,
    getLanguageItemSx,
    proficiencyLevelSx,
    languageNameSx,
} from './DeleteLanguagesDialog.styles';

export interface LanguageEntry {
    name: string;
    proficiency: Proficiency;
}

interface DeleteLanguagesDialogProps {
    open: boolean;
    languages: LanguageEntry[];
    onConfirm: (languageNames: string[]) => void;
    onCancel: () => void;
}

export const DeleteLanguagesDialog = ({
    open,
    languages,
    onConfirm,
    onCancel,
}: DeleteLanguagesDialogProps) => {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const toggle = (name: string) =>
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(name) ? next.delete(name) : next.add(name);
            return next;
        });

    const handleCancel = () => {
        setSelected(new Set());
        onCancel();
    };

    const handleConfirm = () => {
        onConfirm([...selected]);
        setSelected(new Set());
    };

    const count = selected.size;

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: dialogPaperSx }}
        >
            <DialogTitle sx={dialogTitleSx}>
                Remove languages
                <IconButton onClick={handleCancel} sx={closeIconSx}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={dialogContentSx}>
                <Box sx={languagesGridSx}>
                    {languages.map((language) => {
                        const isSelected = selected.has(language.name);
                        const color = getProficiencyColor(language.proficiency);

                        return (
                            <Box
                                key={language.name}
                                onClick={() => toggle(language.name)}
                                sx={getLanguageItemSx(isSelected)}
                            >
                                <Typography variant="body2" sx={proficiencyLevelSx(color)}>
                                    {language.proficiency}
                                </Typography>

                                <Typography variant="body2" sx={languageNameSx}>
                                    {language.name}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </DialogContent>

            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleCancel} variant="outlined" sx={cancelButtonSx}>
                    Cancel
                </Button>

                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={count === 0}
                    sx={deleteButtonSx(count)}
                >
                    Delete
                    {count > 0 && (
                        <Box component="span" sx={counterBadgeSx}>
                            {count}
                        </Box>
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
