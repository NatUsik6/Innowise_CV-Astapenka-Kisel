'use client';

import { useState } from 'react';
import { SearchInput } from '@/features/search-users/ui/SearchInput';
import { UsersTable } from '../widgets/users-table/ui/UsersTable';
import { EmployeesHeader } from '../widgets/users-header/ui/EmployeesHeader';

export default function UsersPage() {
  const [search, setSearch] = useState('');

  return (
    <>
      <EmployeesHeader />
      <SearchInput value={search} onChange={setSearch} />
      <UsersTable search={search} />
    </>
  );
}
// 'use client';

// import { useState } from 'react';
// import { Box } from '@mui/material';

// import { SearchInput } from '@/features/search-users/ui/SearchInput';
// import { CreateUserButton } from '@/features/admin-users/ui/CreateUserButton';
// import { useAdminUsers } from '@/features/admin-users/model/useAdminUsers';
// import { UpdateUserModal } from '@/features/update-user/ui/UpdateUserModal';
// import { UsersTable } from '../widgets/users-table/ui/UsersTable';
// import { EmployeesHeader } from '../widgets/users-header/ui/EmployeesHeader';

// export default function UsersPage() {
//   const [search, setSearch] = useState('');
//   const isAdmin = true;

//   const {
//     users,
//     open,
//     user,
//     mode,
//     openCreate,
//     openUpdate,
//     closeModal,
//     submitUser,
//   } = useAdminUsers();

//   return (
//     <>
//       <EmployeesHeader />

//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <SearchInput value={search} onChange={setSearch} />
//         {isAdmin && <CreateUserButton onClick={openCreate} />}
//       </Box>

//       <UsersTable
//         search={search}
//         users={users}
//         isAdmin={isAdmin}
//         onAdminUpdate={openUpdate}
//       />

//       <UpdateUserModal
//         open={open}
//         user={user}
//         mode={mode}
//         onClose={closeModal}
//         onSubmit={submitUser}
//       />
//     </>
//   );
// }
