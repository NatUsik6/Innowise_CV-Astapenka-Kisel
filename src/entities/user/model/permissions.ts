import { UserRole } from './types';

export const getUserPermissions = (role: UserRole) => {
  const isAdmin = role === 'ADMIN';

  return {
    canCreateUser: isAdmin,
    canUpdateAnyUser: isAdmin,
    canDeleteUser: isAdmin,
    canUpdateSelf: true,
  };
};
