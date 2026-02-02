import { User } from '../model/types';

export const getUserMock = async (id: string): Promise<User> => ({
  id,
  email: 'thorn_pear@icloud.com',
  created_at: 'Sun Jan 14 2024',
  department: 'react',
  department_name: 'React',
  position: 'fe',
  position_name: 'Software Engineer',
  role: 'USER',
  profile: {
    firstName: 'Rostislav',
    lastName: 'Harlanov',
    avatar: undefined,
  },
});

export const getDepartmentsMock = () => ['React', '.NET', 'Java'];
export const getPositionsMock = () => [
  'Software Engineer',
  'Data Analyst',
];
