// import { useState } from 'react';
// import { User } from '@/entities/user/model/types';
// import { mockUsers } from '@/entities/user/model/mock';

// export const useAdminUsers = () => {
//   const [users, setUsers] = useState<User[]>(mockUsers);
//   const [open, setOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [mode, setMode] = useState<'create' | 'update'>('update');

//   const openCreate = () => {
//     setMode('create');
//     setSelectedUser({
//       id: crypto.randomUUID(),
//       email: '',
//       firstName: '',
//       lastName: '',
//       department_name: '',
//       position_name: '',
//       role: 'user',
//     } as User);
//     setOpen(true);
//   };

//   const openUpdate = (user: User) => {
//     setMode('update');
//     setSelectedUser(user);
//     setOpen(true);
//   };

//   const closeModal = () => {
//     setOpen(false);
//     setSelectedUser(null);
//   };

//   const submitUser = (user: User) => {
//     setUsers(prev =>
//       mode === 'create'
//         ? [...prev, user]
//         : prev.map(u => (u.id === user.id ? user : u))
//     );
//     closeModal();
//   };

//   return {
//     users,
//     open,
//     user: selectedUser,
//     mode,
//     openCreate,
//     openUpdate,
//     closeModal,
//     submitUser,
//   };
// };
