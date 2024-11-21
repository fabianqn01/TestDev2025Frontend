// src/app/entities/store/entity.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Entity } from '../models/entity.model';

export const EntityActions = createActionGroup({
  source: 'Entities',
  events: {
    'Load Entities': emptyProps(),
    'Load Entities Success': props<{ entities: Entity[] }>(),
    'Load Entities Failure': props<{ error: string }>(),
    
    'Load Entity': props<{ id: number }>(),
    'Load Entity Success': props<{ entity: Entity }>(),
    'Load Entity Failure': props<{ error: string }>(),
    
    'Create Entity': props<{ entity: Entity }>(),
    'Create Entity Success': props<{ entity: Entity }>(),
    'Create Entity Failure': props<{ error: string }>(),
    
    'Update Entity': props<{ id: number; entity: Entity }>(),
    'Update Entity Success': props<{ entity: Entity }>(),
    'Update Entity Failure': props<{ error: string }>(),
    
    'Delete Entity': props<{ id: number }>(),
    'Delete Entity Success': props<{ id: number }>(),
    'Delete Entity Failure': props<{ error: string }>(),
  }
});