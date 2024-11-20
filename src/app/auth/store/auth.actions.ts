import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginCredentials, LoginResponse } from '../models/auth.interface';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ credentials: LoginCredentials }>(),
    'Login Success': props<{ response: LoginResponse }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
  }
});
