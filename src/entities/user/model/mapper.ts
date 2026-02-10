import { User, UserAPI } from './types';

export const mapUserFromAPI = (apiUser: UserAPI): User => ({
  id: apiUser.id,
  created_at: apiUser.created_at,
  email: apiUser.email,
  role: apiUser.role,
  profile: {
    id: apiUser.profile.id,  
    firstName: apiUser.profile.first_name ?? '',
    lastName: apiUser.profile.last_name ?? '',
    avatar: apiUser.profile.avatar ?? undefined,
  },
  department: apiUser.department?.id ?? '',
  department_name: apiUser.department?.name ?? 'Not assigned',
  position: apiUser.position?.id ?? '',
  position_name: apiUser.position?.name ?? 'Not assigned',
});

export const mapUsersFromAPI = (apiUsers: UserAPI[]): User[] =>
  apiUsers.map(mapUserFromAPI);
