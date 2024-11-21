import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntityService } from '../services/entity.service';
import { EntityActions } from './entity.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EntityEffects {
  private actions$ = inject(Actions);
  private entityService = inject(EntityService);

  loadEntities$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EntityActions.loadEntities),
      mergeMap(() => 
        this.entityService.getAll().pipe(
          map(entities => EntityActions.loadEntitiesSuccess({ entities })),
          catchError(error => 
            of(EntityActions.loadEntitiesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createEntity$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EntityActions.createEntity),
      switchMap(({ entity }) => 
        this.entityService.create(entity).pipe(
          map(createdEntity => EntityActions.createEntitySuccess({ entity: createdEntity })),
          catchError(error => 
            of(EntityActions.createEntityFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateEntity$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EntityActions.updateEntity),
      switchMap(({ id, entity }) => 
        this.entityService.update(id, entity).pipe(
          map(updatedEntity => EntityActions.updateEntitySuccess({ entity: updatedEntity })),
          catchError(error => 
            of(EntityActions.updateEntityFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteEntity$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EntityActions.deleteEntity),
      switchMap(({ id }) => 
        this.entityService.delete(id).pipe(
          map(() => EntityActions.deleteEntitySuccess({ id })),
          catchError(error => 
            of(EntityActions.deleteEntityFailure({ error: error.message }))
          )
        )
      )
    )
  );
}