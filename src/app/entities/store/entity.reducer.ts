import { createReducer, on } from '@ngrx/store';
import { EntityActions } from './entity.actions';
import { Entity } from '../models/entity.model';

export interface EntityState {
  entities: Entity[];
  selectedEntity: Entity | null;
  loading: boolean;
  error: string | null;
}

export const initialState: EntityState = {
  entities: [],
  selectedEntity: null,
  loading: false,
  error: null
};

export const entityReducer = createReducer(
  initialState,
  // Load Entities
  on(EntityActions.loadEntities, state => ({ ...state, loading: true })),
  on(EntityActions.loadEntitiesSuccess, (state, { entities }) => ({
    ...state, 
    entities, 
    loading: false 
  })),
  on(EntityActions.loadEntitiesFailure, (state, { error }) => ({
    ...state, 
    error, 
    loading: false 
  })),

  // Create Entity
  on(EntityActions.createEntity, state => ({ 
    ...state, 
    
    loading: true 
  })),
  on(EntityActions.createEntitySuccess, (state, { entity }) => ({
    ...state, 
    entities: [...state.entities, entity], 
    loading: false 
  })),
  on(EntityActions.createEntityFailure, (state, { error }) => ({
    ...state, 
    error, 
    loading: false 
  })),

  // Update Entity
  on(EntityActions.updateEntity, state => ({ ...state, loading: true })),
  on(EntityActions.updateEntitySuccess, (state, { entity }) => ({
    ...state, 
    entities: state.entities.map(e => e.id === entity.id ? entity : e),
    loading: false 
  })),
  on(EntityActions.updateEntityFailure, (state, { error }) => ({
    ...state, 
    error, 
    loading: false 
  })),

  // Delete Entity
  on(EntityActions.deleteEntity, state => ({ ...state, loading: true })),
  on(EntityActions.deleteEntitySuccess, (state, { id }) => ({
    ...state, 
    entities: state.entities.filter(e => e.id !== id),
    loading: false 
  })),
  on(EntityActions.deleteEntityFailure, (state, { error }) => ({
    ...state, 
    error, 
    loading: false 
  }))
);