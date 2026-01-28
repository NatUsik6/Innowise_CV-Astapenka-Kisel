export type UserProfile = {
  first_name: string;
  last_name: string;
  avatar?: string | null;
};

export type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';

  department: string;
  department_name: string;

  position: string;
  position_name: string;

  profile: UserProfile;
};
