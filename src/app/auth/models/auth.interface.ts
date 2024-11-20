import { User } from "./user.interface";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  roles: string[];  // Nuevo campo para los roles
}
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    data: {
      user: User;
      token: string;
    };
  }