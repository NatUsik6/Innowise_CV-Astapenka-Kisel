import { User } from "@/entities/user/model/types";

export const currentUserMock: User = {
  id: '1', // менять на другой id, чтобы проверить read-only
  email: 'admin@company.com',
  created_at: 'Sun Jan 01 2024',
  department: 'react',
  department_name: 'React',
  position: 'lead',
  position_name: 'Team Lead',
  role: 'USER', // USER | ADMIN
  profile: {
    firstName: 'Admin',
    lastName: 'User',
    avatar: undefined,
  },
};
