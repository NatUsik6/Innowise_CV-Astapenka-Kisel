'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { mockUsers } from '@/entities/user/model/mock';
import { User } from '@/entities/user/model/types';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { useUsersTable } from '../model/useUsersTable';
import { useUpdateUser } from '@/features/update-user/model/useUpdateUser';
import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';

export const UsersTable = ({ search }: { search: string }) => {
  const [usersState, setUsersState] = useState<User[]>(mockUsers);
  const router = useRouter();

  const { users, sortOrder, toggleSort } = useUsersTable(
    usersState,
    search
  );

  const { open, user, openModal, closeModal, updateUser } =
    useUpdateUser();

  const handleUpdate = (updatedUser: User) => {
    setUsersState(prev =>
      prev.map(u => (u.id === updatedUser.id ? updatedUser : u))
    );
    updateUser(updatedUser);
  };

  // временно — потом будет из auth
  const currentUserId = '1';

  const goToProfile = (userId: string) => {
    router.push(`/users/${userId}/profile`);
  };

  return (
    <>
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
              <TableCell sx={headCell}>First Name</TableCell>
              <TableCell sx={headCell}>Last Name</TableCell>
              <TableCell sx={headCell}>Email</TableCell>
              <TableCell
                sx={{ ...headCell, cursor: 'pointer' }}
                onClick={toggleSort}
              >
                Department {sortOrder === 'asc' ? '↑' : '↓'}
              </TableCell>
              <TableCell sx={headCell}>Position</TableCell>
              <TableCell sx={headCell} />
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(user => (
              <TableRow
                key={user.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => goToProfile(user.id)}
              >
                <TableCell sx={bodyCell}>
                  <UserAvatar user={user} />
                </TableCell>

                <TableCell sx={bodyCell}>{user.firstName}</TableCell>
                <TableCell sx={bodyCell}>{user.lastName}</TableCell>
                <TableCell sx={bodyCell}>{user.email}</TableCell>
                <TableCell sx={bodyCell}>
                  {user.department_name}
                </TableCell>
                <TableCell sx={bodyCell}>
                  {user.position_name}
                </TableCell>

                <TableCell sx={bodyCell} align="right">
                  {user.id === currentUserId ? (
                    <IconButton
                      sx={{ color: '#bdbdbd' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(user);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{ color: '#bdbdbd' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToProfile(user.id);
                      }}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateUserModal
        open={open}
        user={user}
        onClose={closeModal}
        onSubmit={handleUpdate}
      />
    </>
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
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Paper,
//   IconButton,
// } from '@mui/material';

// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// import { mockUsers } from '@/entities/user/model/mock';
// import { User } from '@/entities/user/model/types';
// import { UserAvatar } from '@/entities/user/ui/UserAvatar';
// import { useUsersTable } from '../model/useUsersTable';
// import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';
// import { AdminUserMenu } from '@/features/admin-users/ui/AdminUserMenu';

// export const UsersTable = ({
//   search,
//   isAdmin,
// }: {
//   search: string;
//   isAdmin: boolean;
// }) => {
//   const [usersState, setUsersState] = useState<User[]>(mockUsers);
//   const router = useRouter();

//   const { users, sortOrder, toggleSort } = useUsersTable(
//     usersState,
//     search
//   );

//   /* ---------- update modal ---------- */
//   const [open, setOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   const openModal = (user: User) => {
//     setSelectedUser(user);
//     setOpen(true);
//   };

//   const closeModal = () => {
//     setOpen(false);
//     setSelectedUser(null);
//   };

//   const handleUpdate = (updatedUser: User) => {
//     setUsersState(prev =>
//       prev.map(u => (u.id === updatedUser.id ? updatedUser : u))
//     );
//     closeModal();
//   };

//   /* ---------- admin menu ---------- */
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
//   const [menuUser, setMenuUser] = useState<User | null>(null);

//   const openMenu = (e: React.MouseEvent, user: User) => {
//     e.stopPropagation();
//     setAnchorEl(e.currentTarget);
//     setMenuUser(user);
//   };

//   const closeMenu = () => {
//     setAnchorEl(null);
//     setMenuUser(null);
//   };

//   /* ---------- navigation ---------- */
//   const goToProfile = (userId: string) => {
//     router.push(`/users/${userId}/profile`);
//   };

//   return (
//     <>
//       <TableContainer
//         component={Paper}
//         sx={{
//           backgroundColor: '#353535',
//           border: 'none',
//           boxShadow: 'none',
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={headCell} />
//               <TableCell sx={headCell}>First Name</TableCell>
//               <TableCell sx={headCell}>Last Name</TableCell>
//               <TableCell sx={headCell}>Email</TableCell>
//               <TableCell
//                 sx={{ ...headCell, cursor: 'pointer' }}
//                 onClick={toggleSort}
//               >
//                 Department {sortOrder === 'asc' ? '↑' : '↓'}
//               </TableCell>
//               <TableCell sx={headCell}>Position</TableCell>
//               <TableCell sx={headCell} />
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.map(user => (
//               <TableRow
//                 key={user.id}
//                 hover
//                 sx={{ cursor: 'pointer' }}
//                 onClick={() => {
//                   if (!isAdmin) {
//                     goToProfile(user.id);
//                   }
//                 }}
//               >
//                 <TableCell sx={bodyCell}>
//                   <UserAvatar user={user} />
//                 </TableCell>

//                 <TableCell sx={bodyCell}>{user.firstName}</TableCell>
//                 <TableCell sx={bodyCell}>{user.lastName}</TableCell>
//                 <TableCell sx={bodyCell}>{user.email}</TableCell>
//                 <TableCell sx={bodyCell}>
//                   {user.department_name}
//                 </TableCell>
//                 <TableCell sx={bodyCell}>
//                   {user.position_name}
//                 </TableCell>

//                 <TableCell sx={bodyCell} align="right">
//                   {isAdmin ? (
//                     <IconButton
//                       sx={{ color: '#bdbdbd' }}
//                       onClick={(e) => openMenu(e, user)}
//                     >
//                       <MoreVertIcon />
//                     </IconButton>
//                   ) : (
//                     <IconButton
//                       sx={{ color: '#bdbdbd' }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         goToProfile(user.id);
//                       }}
//                     >
//                       <KeyboardArrowRightIcon />
//                     </IconButton>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* ---------- update modal ---------- */}
//       <UpdateUserModal
//         open={open}
//         user={selectedUser}
//         onClose={closeModal}
//         onSubmit={handleUpdate}
//       />

//       {/* ---------- admin dropdown ---------- */}
//       <AdminUserMenu
//         anchorEl={anchorEl}
//         onClose={closeMenu}
//         onUpdate={() => {
//           if (menuUser) openModal(menuUser);
//         }}
//         onDelete={() => {
//           console.log('delete later');
//         }}
//       />
//     </>
//   );
// };

// /* ---------- styles (НЕ ТРОГАЕМ) ---------- */

// const headCell = {
//   color: '#bdbdbd',
//   borderBottom: '1px solid rgba(146,146,146,0.7)',
//   fontSize: 13,
// };

// const bodyCell = {
//   color: '#fff',
//   borderBottom: '1px solid rgba(146,146,146,0.7)',
//   fontSize: 14,
// };
