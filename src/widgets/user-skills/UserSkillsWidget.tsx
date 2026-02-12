import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useMemo } from 'react';

import { Skill } from '@/entities/skills/model/types';
import { DeleteSkillsDialog, SkillGroup } from '@/features/delete-skill/DeleteSkillsDialog';
import { SkillDialog, SkillOption } from '@/features/skill-dialog/SkillDialog';
import { SkillMasteryBar } from '@/features/skill-mastery/SkillMasteryBar';
import { useUserSkills } from './hooks/useUserSkills';
import { useSkillDialogs } from './hooks/useSkillDialogs';
import * as styles from './UserSkillsWidget.styles';

interface UserSkillsWidgetProps {
  userId: string;
  canEdit: boolean;
}

export const UserSkillsWidget = ({ userId, canEdit }: UserSkillsWidgetProps) => {
  const {
    profileSkills,
    skillsData,
    profileLoading,
    profileError,
    addSkill,
    updateSkill,
    deleteSkills,
    adding,
    deleting,
  } = useUserSkills({ userId });

  const {
    addOpen,
    setAddOpen,
    updateOpen,
    deleteOpen,
    setDeleteOpen,
    editingSkill,
    handleAddConfirm,
    handleAddCancel,
    openUpdate,
    handleUpdateConfirm,
    handleUpdateCancel,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useSkillDialogs({ userId, addSkill, updateSkill, deleteSkills });

  const assignedNames = profileSkills.map((s) => s.name);

  const skillOptions: SkillOption[] = useMemo(
    () =>
      skillsData.map((s: Skill) => ({
        id: s.id,
        name: s.name,
        categoryId: s.category?.id ?? null,
      })),
    [skillsData]
  );

  const skillGroups: SkillGroup[] = useMemo(() => {
    const map: Record<string, any[]> = {};

    profileSkills.forEach((ps) => {
      const apiSkill = skillsData.find((s: Skill) => s.name === ps.name);
      const cat =
        apiSkill?.category_parent_name ?? apiSkill?.category_name ?? 'Other';

      if (!map[cat]) map[cat] = [];
      map[cat].push(ps);
    });

    return Object.entries(map).map(([categoryName, skills]) => ({
      categoryName,
      skills,
    }));
  }, [profileSkills, skillsData]);

  if (profileLoading) {
    return (
      <Box sx={styles.loaderWrapperSx}>
        <CircularProgress sx={styles.loaderSx} />
      </Box>
    );
  }

  if (profileError) {
    return <Alert severity="error">Failed to load skills.</Alert>;
  }

  return (
    <Box sx={styles.containerSx}>
      {skillGroups.length === 0 ? (
        <Typography sx={styles.emptyTextSx}>No skills added yet.</Typography>
      ) : (
        skillGroups.map((group) => (
          <Box key={group.categoryName} sx={styles.categoryWrapperSx}>
            <Typography variant="subtitle1" sx={styles.categoryTitleSx}>
              {group.categoryName}
            </Typography>

            <Box sx={styles.skillsGridSx}>
              {group.skills.map((skill) => (
                <SkillMasteryBar
                  key={skill.name}
                  name={skill.name}
                  mastery={skill.mastery}
                  readonly={!canEdit}
                  onClick={() => openUpdate(skill)}
                />
              ))}
            </Box>
          </Box>
        ))
      )}

      {canEdit && (
        <Box sx={styles.actionsWrapperSx}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setAddOpen(true)}
            disabled={adding}
            sx={styles.addButtonSx}
          >
            Add skill
          </Button>

          <Button
            startIcon={<DeleteOutlineIcon sx={{ color: '#e53935' }} />}
            onClick={() => setDeleteOpen(true)}
            disabled={profileSkills.length === 0 || deleting}
            sx={styles.deleteButtonSx}
          >
            Remove skills
          </Button>
        </Box>
      )}

      <SkillDialog
        open={addOpen}
        mode="add"
        skills={skillOptions}
        assignedSkillNames={assignedNames}
        onConfirm={handleAddConfirm}
        onCancel={handleAddCancel}
      />

      <SkillDialog
        open={updateOpen}
        mode="update"
        skills={skillOptions}
        initialValue={
          editingSkill
            ? {
              name: editingSkill.name,
              categoryId: editingSkill.categoryId ?? null,
              mastery: editingSkill.mastery,
            }
            : undefined
        }
        onConfirm={handleUpdateConfirm}
        onCancel={handleUpdateCancel}
      />

      <DeleteSkillsDialog
        open={deleteOpen}
        skillGroups={skillGroups}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};