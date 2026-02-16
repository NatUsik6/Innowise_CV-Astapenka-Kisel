import { Box, Tooltip, Typography } from '@mui/material';

import { getMasteryColor } from '@/entities/skills/model/getMasteryColor';
import { Mastery } from '@/entities/skills/model/types';

import * as styles from './SkillMasteryBar.styles';

interface SkillMasteryBarProps {
  name: string;
  mastery: Mastery;
  readonly?: boolean;
  onClick?: () => void;
}

export const SkillMasteryBar = ({
  name,
  mastery,
  readonly = false,
  onClick,
}: SkillMasteryBarProps) => {
  const color = getMasteryColor(mastery);

  return (
    <Tooltip title={mastery} placement="top" arrow>
      <Box
        onClick={readonly ? undefined : onClick}
        sx={styles.wrapperSx(readonly)}
      >
        <Box
          className="mastery-bar"
          sx={styles.masteryBarSx(color)}
        />
        <Typography variant="body2" sx={styles.skillNameSx}>
          {name}
        </Typography>
      </Box>
    </Tooltip>
  );
};
