// src/app/entities/store/entity.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from './entity.reducer';

export const selectEntityState = createFeatureSelector<EntityState>('entities');

export const selectAllEntities = createSelector(
  selectEntityState,
  (state) => state.entities
);

export const selectEntityLoading = createSelector(
  selectEntityState,
  (state) => state.loading
);

export const selectEntityError = createSelector(
  selectEntityState,
  (state) => state.error
);