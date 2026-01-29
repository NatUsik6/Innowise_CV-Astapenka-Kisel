export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  department_name: string;
  position: string;
  position_name: string;
  role: UserRole;
  avatar?: string;
}
