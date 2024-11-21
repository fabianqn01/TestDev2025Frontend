// src/app/employees/store/employee.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { EmployeeActions } from './employee.actions';
import { Employee } from '../models/employee.model';

export interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
}

export const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null
};

export const employeeReducer = createReducer(
  initialState,
  // Load Employees
  on(EmployeeActions.loadEmployees, (state) => ({ ...state, loading: true })),
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Load Single Employee
  on(EmployeeActions.loadEmployeeSuccess, (state, { employee }) => ({
    ...state,
    selectedEmployee: employee
  })),

  // Create Employee
  on(EmployeeActions.createEmployee, (state) => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.createEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    loading: false
  })),
  on(EmployeeActions.createEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Update Employee
  on(EmployeeActions.updateEmployee, (state) => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((e) =>
      e.id === employee.id ? employee : e
    ),
    loading: false
  })),
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Delete Employee
  on(EmployeeActions.deleteEmployee, (state) => ({
    ...state,
    loading: true
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((e) => e.id !== id),
    loading: false
  })),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
