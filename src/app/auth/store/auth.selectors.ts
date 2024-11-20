import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth.interface';
import { authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectRoles = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.roles
);