'use client';

import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from 'next/navigation';

import { User } from '@/entities/user/model/types';
import { actionButtonSx } from './UserUsersTable.styles';

interface Props {
  user: User;
  currentUserId: string | number;
  onEdit: (user: User) => void;
}

export const UserActions = ({ user, currentUserId, onEdit }: Props) => {
  const router = useRouter();

  const isCurrentUser = String(user.id) === String(currentUserId);

  if (isCurrentUser) {
    return (
      <IconButton
        sx={actionButtonSx}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(user);
        }}
      >
        <MoreVertIcon />
      </IconButton>
    );
  }

  return (
    <IconButton
      sx={actionButtonSx}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/users/${user.id}/profile`);
      }}
    >
      <KeyboardArrowRightIcon />
    </IconButton>
  );
};
