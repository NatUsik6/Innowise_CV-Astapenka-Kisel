'use client';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { User } from '@/entities/user/model/types';

type Props = {
  user: User;
  role: 'admin' | 'user';
  currentUserId: string;
};

export const UsersTableRow = ({
  user,
  role,
  currentUserId,
}: Props) => {
  const canEdit =
    role === 'admin' || user.id === currentUserId;

  const { profile } = user;

  return (
    <TableRow>
      <TableCell>
        <Avatar src={profile.avatar || undefined}>
          {profile.first_name.charAt(0)}
        </Avatar>
      </TableCell>

      <TableCell>{profile.first_name}</TableCell>
      <TableCell>{profile.last_name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.department_name}</TableCell>
      <TableCell>{user.position_name}</TableCell>

      <TableCell align="right">
        {canEdit ? (
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        ) : (
          <ArrowForwardIosIcon fontSize="small" />
        )}
      </TableCell>
    </TableRow>
  );
};
