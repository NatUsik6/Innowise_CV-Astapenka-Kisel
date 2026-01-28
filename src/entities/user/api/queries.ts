import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      role
      department
      department_name
      position
      position_name
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;

export const USER_QUERY = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
      role
      department
      department_name
      position
      position_name
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;