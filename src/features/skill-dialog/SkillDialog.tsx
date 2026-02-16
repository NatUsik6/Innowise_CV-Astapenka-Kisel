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

import { Mastery } from '@/entities/skills/model/types';
import { useSkillDialogState } from './useSkillDialogState';

import * as styles from './SkillDialog.styles';
import { StyledSelect } from '@/shared/ui/users/inputs/StyledSelect';
import { SkillDialogProps } from './SkillDialog.types';

const MASTERY_OPTIONS = Object.values(Mastery);

export const SkillDialog = ({
  open,
  mode,
  skills,
  assignedSkillNames = [],
  initialValue,
  onConfirm,
  onCancel,
}: SkillDialogProps) => {
  const { skillName, setSkillName, mastery, setMastery, isValid } =
    useSkillDialogState(open, initialValue);

  const availableSkills =
    mode === 'add'
      ? skills.filter((s) => !assignedSkillNames.includes(s.name))
      : skills;

  const handleConfirm = () => {
    const found = skills.find((s) => s.name === skillName);

    onConfirm({
      name: skillName,
      categoryId: found?.categoryId ?? null,
      mastery,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: styles.dialogPaperSx }}
    >
      <DialogTitle sx={styles.dialogTitleSx}>
        {mode === 'add' ? 'Add skill' : 'Update skill'}
        <IconButton onClick={onCancel} sx={styles.closeIconSx}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={styles.dialogContentSx}>
        <StyledSelect
          label="Skill"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value as string)}
          disabled={mode === 'update'}
        >
          {mode === 'add' && (
            <MenuItem value="">
              <em>Select a skill</em>
            </MenuItem>
          )}
          {availableSkills.map((s) => (
            <MenuItem key={s.id} value={s.name}>
              {s.name}
            </MenuItem>
          ))}
        </StyledSelect>

        <StyledSelect
          label="Skill mastery"
          value={mastery}
          onChange={(e) => setMastery(e.target.value as Mastery)}
        >
          {MASTERY_OPTIONS.map((masteryLevel) => (
            <MenuItem key={masteryLevel} value={masteryLevel}>
              {masteryLevel}
            </MenuItem>
          ))}
        </StyledSelect>
      </DialogContent>

      <DialogActions sx={styles.dialogActionsSx}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={styles.cancelButtonSx}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!isValid}
          sx={styles.confirmButtonSx(isValid)}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};