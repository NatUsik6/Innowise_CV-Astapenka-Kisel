import { gql } from '@apollo/client';

export interface AuthResult {
  user: {
    id: string;
    email: string;
  };
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  login: AuthResult;
}

export interface SignupResponse {
  signup: AuthResult;
}

export const LOGIN_QUERY = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      access_token
      refresh_token
      user {
        id
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      access_token
      refresh_token
      user {
        id
        email
      }
    }
  }
`;