import { useState } from 'react';
import { SkillMastery } from '@/entities/skills/model/types';
import { SkillDialogValue } from '@/features/skill-dialog/SkillDialog';

interface UseSkillDialogsProps {
  userId: string;
  addSkill: (options: any) => Promise<any>;
  updateSkill: (options: any) => Promise<any>;
  deleteSkills: (options: any) => Promise<any>;
}

export const useSkillDialogs = ({
  userId,
  addSkill,
  updateSkill,
  deleteSkills,
}: UseSkillDialogsProps) => {
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillMastery | null>(null);

  const handleAddConfirm = async (value: SkillDialogValue) => {
    await addSkill({
      variables: {
        skill: {
          userId,
          name: value.name,
          categoryId: value.categoryId,
          mastery: value.mastery,
        },
      },
    });
    setAddOpen(false);
  };

  const openUpdate = (skill: SkillMastery) => {
    setEditingSkill(skill);
    setUpdateOpen(true);
  };

  const handleUpdateConfirm = async (value: SkillDialogValue) => {
    await updateSkill({
      variables: {
        skill: {
          userId,
          name: value.name,
          categoryId: value.categoryId,
          mastery: value.mastery,
        },
      },
    });
    setUpdateOpen(false);
    setEditingSkill(null);
  };

  const handleDeleteConfirm = async (names: string[]) => {
    await deleteSkills({
      variables: {
        skill: {
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
    setEditingSkill(null);
  };

  const handleDeleteCancel = () => setDeleteOpen(false);

  return {
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
  };
};