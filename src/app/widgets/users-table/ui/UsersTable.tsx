'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { User } from '@/entities/user/model/types';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { SortField, useUsersTable } from '../model/useUsersTable';

import {
  tableContainerSx,
  headCellSx,
  bodyCellSx,
  sortableCellSx,
  tableRowSx,
} from './UsersTable.styles';

interface Props {
  users: User[];
  search: string;
  renderActions: (user: User) => React.ReactNode;
}

export const UsersTable = ({
  users: initialUsers,
  search,
  renderActions,
}: Props) => {
  const router = useRouter();

  const {
    users,
    sortField,
    sortOrder,
    handleSort,
  } = useUsersTable(initialUsers, search);

  const handleRowClick = (user: User) => {
    router.push(`/users/${user.id}/profile`);
  };

  const renderArrow = (field: SortField) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ↑↓';
  };

  return (
    <TableContainer component={Paper} sx={tableContainerSx}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx} />

            <TableCell
              sx={sortableCellSx}
              onClick={() => handleSort('firstName')}
            >
              First Name{renderArrow('firstName')}
            </TableCell>

            <TableCell
              sx={sortableCellSx}
              onClick={() => handleSort('lastName')}
            >
              Last Name{renderArrow('lastName')}
            </TableCell>

            <TableCell
              sx={sortableCellSx}
              onClick={() => handleSort('email')}
            >
              Email{renderArrow('email')}
            </TableCell>

            <TableCell
              sx={sortableCellSx}
              onClick={() => handleSort('department')}
            >
              Department{renderArrow('department')}
            </TableCell>

            <TableCell
              sx={sortableCellSx}
              onClick={() => handleSort('position')}
            >
              Position{renderArrow('position')}
            </TableCell>

            <TableCell sx={headCellSx} />
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(user => (
            <TableRow
              key={user.id}
              hover
              sx={tableRowSx}
              onClick={() => handleRowClick(user)}
            >
              <TableCell sx={bodyCellSx}>
                <UserAvatar user={user} />
              </TableCell>

              <TableCell sx={bodyCellSx}>{user.firstName}</TableCell>
              <TableCell sx={bodyCellSx}>{user.lastName}</TableCell>
              <TableCell sx={bodyCellSx}>{user.email}</TableCell>
              <TableCell sx={bodyCellSx}>{user.department_name}</TableCell>
              <TableCell sx={bodyCellSx}>{user.position_name}</TableCell>

              <TableCell
                sx={bodyCellSx}
                align="right"
                onClick={(e) => e.stopPropagation()}
              >
                {renderActions(user)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
