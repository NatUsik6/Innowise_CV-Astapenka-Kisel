import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useMemo } from 'react';

import { Skill } from '@/entities/skills/model/types';
import { DeleteSkillsDialog } from '@/features/delete-skill/DeleteSkillsDialog';
import { SkillDialog } from '@/features/skill-dialog/SkillDialog';
import { SkillMasteryBar } from '@/features/skill-mastery/SkillMasteryBar';
import { SkillOption } from '@/features/skill-dialog/SkillDialog.types';
import { SkillGroup } from '@/features/delete-skill/DeleteSkillsDialog.types';
import { CvSkillsWidgetProps } from './CvSkillsWidget.types';
import * as styles from './CvSkillsWidget.styles';
import { useCvSkills } from './hooks/useCvSkills';
import { useCvSkillDialogs } from './hooks/useCvSkillDialogs';

export const CvSkillsWidget = ({ cvId, canEdit }: CvSkillsWidgetProps) => {
    const {
        cvSkills,
        skillsData,
        cvLoading,
        cvError,
        addSkill,
        updateSkill,
        deleteSkills,
        adding,
        deleting,
    } = useCvSkills({ cvId });

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
    } = useCvSkillDialogs({ cvId, addSkill, updateSkill, deleteSkills });

    const assignedNames = cvSkills.map((s) => s.name);

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

        cvSkills.forEach((cs) => {
            const apiSkill = skillsData.find((s: Skill) => s.name === cs.name);
            const cat =
                apiSkill?.category_parent_name ?? apiSkill?.category_name ?? 'Other';

            if (!map[cat]) map[cat] = [];
            map[cat].push(cs);
        });

        return Object.entries(map).map(([categoryName, skills]) => ({
            categoryName,
            skills,
        }));
    }, [cvSkills, skillsData]);

    if (cvLoading) {
        return (
            <Box sx={styles.loaderWrapperSx}>
                <CircularProgress sx={styles.loaderSx} />
            </Box>
        );
    }

    if (cvError) {
        return <Alert severity="error">Failed to load CV skills.</Alert>;
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
                        disabled={cvSkills.length === 0 || deleting}
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
