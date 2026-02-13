import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

import { Mastery } from '@/entities/skills/model/types';
import { SkillCategorySection } from './SkillCategorySection';

import * as styles from './DeleteSkillsDialog.styles';
import { DeleteSkillsDialogProps } from './DeleteSkillsDialog.types';

export const DeleteSkillsDialog = ({
  open,
  skillGroups,
  onConfirm,
  onCancel,
}: DeleteSkillsDialogProps) => {
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
      PaperProps={{ sx: styles.dialogPaperSx }}
    >
      <DialogTitle sx={styles.dialogTitleSx}>
        Remove skills
        <IconButton onClick={handleCancel} sx={styles.closeIconSx}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={styles.dialogContentSx}>
        {skillGroups.map(({ categoryName, skills }) => (
          <SkillCategorySection
            key={categoryName}
            categoryName={categoryName}
            skills={skills}
            selectedSkills={selected}
            onToggle={toggle}
          />
        ))}
      </DialogContent>

      <DialogActions sx={styles.dialogActionsSx}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={styles.cancelButtonSx}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={count === 0}
          sx={styles.deleteButtonSx(count)}
        >
          Delete
          {count > 0 && (
            <Box component="span" sx={styles.counterBadgeSx}>
              {count}
            </Box>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};