import { UserRole } from '@/entities/user/model/types';

export const useSession = () => {
  return {
    user: {
      id: '1',
      role: 'USER' as UserRole, // для проверки меняем между USER и ADMIN
    },
    isAuthenticated: true,
  };
};
