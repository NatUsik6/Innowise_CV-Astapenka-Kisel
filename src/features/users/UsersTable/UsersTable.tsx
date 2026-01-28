'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { User } from '@/entities/user/model/types';
import { UsersTableRow } from './UsersTableRow';

type Props = {
  users: User[];
  role: 'admin' | 'user';
  currentUserId: string;
};

export const UsersTable = ({
  users,
  role,
  currentUserId,
}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Position</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user, index) => (
            <>
              <UsersTableRow
                key={user.id}
                user={user}
                role={role}
                currentUserId={currentUserId}
              />

              {index !== users.length - 1 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ p: 0 }}>
                    <Divider variant="middle" />
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
