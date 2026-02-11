import { Box, Typography } from '@mui/material';
import { Mastery } from '@/entities/skills/model/types';
import { getMasteryColor } from '@/entities/skills/model/getMasteryColor';

interface SkillEntry {
  name: string;
  mastery: Mastery;
}

interface SkillCategorySectionProps {
  categoryName: string;
  skills: SkillEntry[];
  selectedSkills: Set<string>;
  onToggle: (name: string) => void;
}

export const SkillCategorySection = ({
  categoryName,
  skills,
  selectedSkills,
  onToggle,
}: SkillCategorySectionProps) => {
  const categoryWrapperSx = { mb: 3 };
  const categoryTitleSx = { fontWeight: 500, mb: 1.5, color: '#fff' };
  const skillsGridSx = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 2,
  };

  return (
    <Box sx={categoryWrapperSx}>
      <Typography sx={categoryTitleSx}>{categoryName}</Typography>

      <Box sx={skillsGridSx}>
        {skills.map((skill) => {
          const isSelected = selectedSkills.has(skill.name);
          const color = getMasteryColor(skill.mastery);

          const skillItemSx = {
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            opacity: isSelected ? 0.35 : 1,
            transition: 'opacity .2s',
            '&:hover': { opacity: isSelected ? 0.35 : 0.7 },
          };

          const masteryBarSx = {
            width: 80,
            height: 3,
            borderRadius: 1,
            bgcolor: color,
            flexShrink: 0,
          };

          const skillNameSx = {
            color: 'rgba(255,255,255,0.65)',
            whiteSpace: 'nowrap',
          };

          return (
            <Box key={skill.name} onClick={() => onToggle(skill.name)} sx={skillItemSx}>
              <Box sx={masteryBarSx} />
              <Typography variant="body2" sx={skillNameSx}>
                {skill.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};