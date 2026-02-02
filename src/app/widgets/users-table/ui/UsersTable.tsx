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
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: '#353535',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={headCell} />

            <TableCell
              sx={sortableCell}
              onClick={() => handleSort('firstName')}
            >
              First Name{renderArrow('firstName')}
            </TableCell>

            <TableCell
              sx={sortableCell}
              onClick={() => handleSort('lastName')}
            >
              Last Name{renderArrow('lastName')}
            </TableCell>

            <TableCell
              sx={sortableCell}
              onClick={() => handleSort('email')}
            >
              Email{renderArrow('email')}
            </TableCell>

            <TableCell
              sx={sortableCell}
              onClick={() => handleSort('department')}
            >
              Department{renderArrow('department')}
            </TableCell>

            <TableCell
              sx={sortableCell}
              onClick={() => handleSort('position')}
            >
              Position{renderArrow('position')}
            </TableCell>

            <TableCell sx={headCell} />
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(user => (
            <TableRow
              key={user.id}
              hover
              onClick={() => handleRowClick(user)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              <TableCell sx={bodyCell}>
                <UserAvatar user={user} />
              </TableCell>

              <TableCell sx={bodyCell}>
                {user.firstName}
              </TableCell>

              <TableCell sx={bodyCell}>
                {user.lastName}
              </TableCell>

              <TableCell sx={bodyCell}>
                {user.email}
              </TableCell>

              <TableCell sx={bodyCell}>
                {user.department_name}
              </TableCell>

              <TableCell sx={bodyCell}>
                {user.position_name}
              </TableCell>

              <TableCell
                sx={bodyCell}
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

const headCell = {
  color: '#bdbdbd',
  borderBottom: '1px solid rgba(146,146,146,0.7)',
  fontSize: 13,
};

const bodyCell = {
  color: '#fff',
  borderBottom: '1px solid rgba(146,146,146,0.7)',
  fontSize: 14,
};

const sortableCell = {
  ...headCell,
  cursor: 'pointer',
};