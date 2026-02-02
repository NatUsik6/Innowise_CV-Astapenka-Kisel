import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      firstName
      lastName
      department
      department_name
      position
      position_name
      role
      avatar
    }
  }
`;
