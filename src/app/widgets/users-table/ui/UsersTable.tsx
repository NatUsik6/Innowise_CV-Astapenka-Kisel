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

const sortableColumns: {
  label: string;
  field: SortField;
}[] = [
    { label: 'First Name', field: 'firstName' },
    { label: 'Last Name', field: 'lastName' },
    { label: 'Email', field: 'email' },
    { label: 'Department', field: 'department' },
    { label: 'Position', field: 'position' },
  ];

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

            {sortableColumns.map(({ label, field }) => (
              <TableCell
                key={field}
                sx={sortableCellSx}
                onClick={() => handleSort(field)}
              >
                {label}
                {renderArrow(field)}
              </TableCell>
            ))}

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
