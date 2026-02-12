import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Proficiency } from '@/entities/languages/model/types';
import { StyledSelect } from '@/shared/ui/users/inputs/StyledSelect';
import { useLanguageDialogState } from './useLanguageDialogState';
import {
    dialogPaperSx,
    dialogTitleSx,
    closeIconSx,
    dialogContentSx,
    dialogActionsSx,
    cancelButtonSx,
    confirmButtonSx,
} from './LanguageDialog.styles';

export interface LanguageOption {
    id: string;
    name: string;
    native_name?: string | null;
}

export interface LanguageDialogValue {
    name: string;
    proficiency: Proficiency;
}

interface LanguageDialogProps {
    open: boolean;
    mode: 'add' | 'update';
    languages: LanguageOption[];
    assignedLanguageNames?: string[];
    initialValue?: LanguageDialogValue;
    onConfirm: (value: LanguageDialogValue) => void;
    onCancel: () => void;
}

const PROFICIENCY_OPTIONS = Object.values(Proficiency);

export const LanguageDialog = ({
    open,
    mode,
    languages,
    assignedLanguageNames = [],
    initialValue,
    onConfirm,
    onCancel,
}: LanguageDialogProps) => {
    const { languageName, setLanguageName, proficiency, setProficiency, isValid } =
        useLanguageDialogState(open, initialValue);

    const availableLanguages =
        mode === 'add'
            ? languages.filter((lang) => !assignedLanguageNames.includes(lang.name))
            : languages;

    const handleConfirm = () => {
        onConfirm({
            name: languageName,
            proficiency,
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
            PaperProps={{ sx: dialogPaperSx }}
        >
            <DialogTitle sx={dialogTitleSx}>
                {mode === 'add' ? 'Add language' : 'Update language'}
                <IconButton onClick={onCancel} sx={closeIconSx}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={dialogContentSx}>
                <StyledSelect
                    label="Language"
                    value={languageName}
                    onChange={(e) => setLanguageName(e.target.value as string)}
                    disabled={mode === 'update'}
                >
                    {mode === 'add' && (
                        <MenuItem value="">
                            <em>Select a language</em>
                        </MenuItem>
                    )}
                    {availableLanguages.map((lang) => (
                        <MenuItem key={lang.id} value={lang.name}>
                            {lang.name}
                        </MenuItem>
                    ))}
                </StyledSelect>

                <StyledSelect
                    label="Language proficiency"
                    value={proficiency}
                    onChange={(e) => setProficiency(e.target.value as Proficiency)}
                >
                    {PROFICIENCY_OPTIONS.map((level) => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </StyledSelect>
            </DialogContent>

            <DialogActions sx={dialogActionsSx}>
                <Button onClick={onCancel} variant="outlined" sx={cancelButtonSx}>
                    Cancel
                </Button>

                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={!isValid}
                    sx={confirmButtonSx(isValid)}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
