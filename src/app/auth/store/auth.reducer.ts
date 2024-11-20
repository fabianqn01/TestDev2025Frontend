import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from '../models/auth.interface';


export const authFeatureKey = 'auth';


export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  roles: [],  // Inicializa los roles como un array vacío
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response.data.user,
    token: response.data.token,
    roles: response.data.user.roles,  // Almacena los roles
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.logout, state => ({
    ...state,
    user: null,
    token: null,
    roles: [],  // Limpia los roles al hacer logout
  }))
);
