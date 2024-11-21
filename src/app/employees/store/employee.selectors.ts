// src/app/employees/store/employee.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';  // Asegúrate de que esta ruta sea correcta

// Selector para acceder al estado de los empleados
export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

// Selector para obtener todos los empleados
export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state) => state.employees
);

// Selector para verificar si se está cargando la lista de empleados
export const selectEmployeeLoading = createSelector(
  selectEmployeeState,
  (state) => state.loading
);

// Selector para obtener el error relacionado con los empleados
export const selectEmployeeError = createSelector(
  selectEmployeeState,
  (state) => state.error
);

// Selector para obtener un empleado seleccionado (si está presente)
export const selectSelectedEmployee = createSelector(
  selectEmployeeState,
  (state) => state.selectedEmployee
);
