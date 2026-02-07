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