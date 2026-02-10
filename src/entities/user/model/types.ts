export type UserRole = 'Admin' | 'Employee';

export interface UserProfile {
  id: string;          
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
  created_at: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  department: Department | null;
  position: Position | null;
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  role: UserRole;
  profile: {
    id: string;       
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  department: string;
  department_name: string;
  position: string;
  position_name: string;
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
  first_name?: string | null;
  last_name?: string | null;
}

export interface UpdateUserFormData {
  firstName: string;
  lastName: string;
  departmentId?: string;
  positionId?: string;
  role: UserRole;
  email: string;
}