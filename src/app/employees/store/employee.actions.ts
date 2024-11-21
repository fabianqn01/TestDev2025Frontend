// src/app/employees/store/employee.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Employee } from '../models/employee.model';

export const EmployeeActions = createActionGroup({
  source: 'Employees',
  events: {
    'Load Employees': emptyProps(),
    'Load Employees Success': props<{ employees: Employee[] }>(),
    'Load Employees Failure': props<{ error: string }>(),

    'Load Employee': props<{ id: number }>(),
    'Load Employee Success': props<{ employee: Employee }>(),
    'Load Employee Failure': props<{ error: string }>(),

    'Create Employee': props<{ employee: Employee }>(),
    'Create Employee Success': props<{ employee: Employee }>(),
    'Create Employee Failure': props<{ error: string }>(),

    'Update Employee': props<{ id: number; employee: Employee }>(),
    'Update Employee Success': props<{ employee: Employee }>(),
    'Update Employee Failure': props<{ error: string }>(),

    'Delete Employee': props<{ id: number }>(),
    'Delete Employee Success': props<{ id: number }>(),
    'Delete Employee Failure': props<{ error: string }>(),
  }
});
