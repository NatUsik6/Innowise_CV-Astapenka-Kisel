import { User, UserAPI } from './types';

export const mapUserFromAPI = (apiUser: UserAPI): User => {
  return {
    id: apiUser.id,
    email: apiUser.email,
    firstName: apiUser.profile.first_name,
    lastName: apiUser.profile.last_name,
    department: apiUser.department?.id ?? '',
    department_name: apiUser.department?.name ?? 'Not assigned',
    position: apiUser.position?.id ?? '',
    position_name: apiUser.position?.name ?? 'Not assigned',
    role: apiUser.role,
    avatar: apiUser.profile.avatar,
  };
};

export const mapUsersFromAPI = (apiUsers: UserAPI[]): User[] => {
  return apiUsers.map(mapUserFromAPI);
};