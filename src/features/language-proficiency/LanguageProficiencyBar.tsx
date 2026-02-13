import { Box, Typography } from '@mui/material';
import { getProficiencyColor } from '@/entities/languages/model/getProficiencyColor';
import { Proficiency } from '@/entities/languages/model/types';
import {
    getWrapperSx,
    proficiencyLevelSx,
    languageNameSx,
} from './LanguageProficiencyBar.styles';

interface LanguageProficiencyBarProps {
    name: string;
    proficiency: Proficiency;
    readonly?: boolean;
    onClick?: () => void;
}

export const LanguageProficiencyBar = ({
    name,
    proficiency,
    readonly = false,
    onClick,
}: LanguageProficiencyBarProps) => {
    const color = getProficiencyColor(proficiency);

    return (
        <Box onClick={readonly ? undefined : onClick} sx={getWrapperSx(readonly)}>
            <Typography
                className="proficiency-level"
                sx={proficiencyLevelSx(color)}
            >
                {proficiency}
            </Typography>

            <Typography variant="body2" sx={languageNameSx}>
                {name}
            </Typography>
        </Box>
    );
};
