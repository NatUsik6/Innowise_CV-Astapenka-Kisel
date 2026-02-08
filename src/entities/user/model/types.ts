export type UserRole = 'USER' | 'ADMIN';

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  department: string;
  department_name: string;
  position: string;
  position_name: string;
  role: UserRole;
  profile: UserProfile;
}
