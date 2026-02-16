import { useEffect, useState } from 'react';
import { Mastery } from '@/entities/skills/model/types';
import { SkillDialogValue } from './SkillDialog.types';

export const useSkillDialogState = (
  open: boolean,
  initialValue?: SkillDialogValue
) => {
  const [skillName, setSkillName] = useState('');
  const [mastery, setMastery] = useState<Mastery>(Mastery.Novice);

  useEffect(() => {
    if (open) {
      setSkillName(initialValue?.name ?? '');
      setMastery(initialValue?.mastery ?? Mastery.Novice);
    }
  }, [open, initialValue]);

  const isValid = Boolean(skillName && mastery);

  return {
    skillName,
    setSkillName,
    mastery,
    setMastery,
    isValid,
  };
};