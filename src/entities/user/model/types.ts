export type UserRole = 'Admin' | 'Employee';

export interface UserProfile {
  first_name: string;
  last_name: string;
  full_name: string;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Position {
  id: string;
  name: string;
}

export interface UserAPI {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  department: Department | null;
  position: Position | null;
}

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

export interface CreateUserInput {
  auth: {
    email: string;
    password: string;
  };
  profile: {
    first_name: string;
    last_name: string;
  };
  cvsIds: string[];
  departmentId?: string | null;
  positionId?: string | null;
  role: UserRole;
}

export interface UpdateUserInput {
  userId: string;
  cvsIds?: string[];
  departmentId?: string | null;
  positionId?: string | null;
  role?: UserRole;
}

export interface UpdateProfileInput {
  userId: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateUserFormData {
  firstName: string;
  lastName: string;
  departmentId?: string;
  positionId?: string;
  role: UserRole;
  email: string;
}