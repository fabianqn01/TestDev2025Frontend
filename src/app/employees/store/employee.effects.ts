// src/app/employees/store/employee.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import { EmployeeActions } from './employee.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);
  private readonly store = inject(Store);

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.employeeService.getAll().pipe(
          map((employees) => EmployeeActions.loadEmployeesSuccess({ employees })),
          catchError((error) =>
            of(EmployeeActions.loadEmployeesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployee),
      switchMap(({ id }) =>
        this.employeeService.getById(id).pipe(
          map((employee) => EmployeeActions.loadEmployeeSuccess({ employee })),
          catchError((error) =>
            of(EmployeeActions.loadEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployee),
      switchMap(({ employee }) =>
        this.employeeService.create(employee).pipe(
          map((createdEmployee) => {
            // Primero, despachar la acción de éxito de creación
            this.store.dispatch(EmployeeActions.createEmployeeSuccess({ employee: createdEmployee }));
            // Después de crear, cargar nuevamente los empleados
            this.store.dispatch(EmployeeActions.loadEmployees());
            return EmployeeActions.createEmployeeSuccess({ employee: createdEmployee });
          }),
          catchError((error) =>
            of(EmployeeActions.createEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );
  

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      switchMap(({ id, employee }) =>
        this.employeeService.update(id, employee).pipe(
          map((updatedEmployee) =>
          {
            // Primero, despachar la acción de éxito de creación
            this.store.dispatch(EmployeeActions.updateEmployeeSuccess({ employee: updatedEmployee }));
            // Después de crear, cargar nuevamente los empleados
            this.store.dispatch(EmployeeActions.loadEmployees());
            return EmployeeActions.updateEmployeeSuccess({ employee: updatedEmployee })
          }),
          catchError((error) =>
            of(EmployeeActions.updateEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      switchMap(({ id }) =>
        this.employeeService.delete(id).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id })),
          catchError((error) =>
            of(EmployeeActions.deleteEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
