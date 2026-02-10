import { Menu, MenuItem } from '@mui/material';

import {
  menuPaperSx,
  menuItemSx,
  deleteMenuItemSx,
} from './AvatarActionsMenu.styles';

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  canDelete: boolean;
}

export const AvatarActionsMenu = ({
  anchorEl,
  open,
  onClose,
  onUpdate,
  onDelete,
  canDelete,
}: Props) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: menuPaperSx,
      }}
    >
      <MenuItem
        sx={menuItemSx}
        onClick={() => {
          onUpdate();
          onClose();
        }}
      >
        Update avatar
      </MenuItem>

      {canDelete && (
        <MenuItem
          sx={deleteMenuItemSx}
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete avatar
        </MenuItem>
      )}
    </Menu>
  );
};