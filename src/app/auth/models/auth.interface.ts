import { User } from "./user.interface";

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  }