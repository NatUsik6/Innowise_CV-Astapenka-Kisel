import { User } from '../model/types';

export type UsersQueryResponse = {
  users: User[];
};

export type UserQueryVariables = {
  userId: string;
};

export type UserQueryResponse = {
  user: User;
};