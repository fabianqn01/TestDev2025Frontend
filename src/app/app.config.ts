import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { authReducer } from './auth/store/auth.reducer';
import { EntityEffects } from './entities/store/entity.effects';
import { entityReducer } from './entities/store/entity.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { authInterceptorFn } from './core';
import { EmployeeEffects } from './employees/store/employee.effects';  // Asegúrate de importar los efectos de empleados
import { employeeReducer } from './employees/store/employee.reducer';  // Asegúrate de importar el reducer de empleados

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideAnimations(),
    provideStore({
      auth: authReducer,
      entities: entityReducer,
      employees: employeeReducer  // Asegúrate de agregar el reducer de empleados
    }),
    provideEffects([AuthEffects, EntityEffects, EmployeeEffects]),  // Incluye los efectos de empleados
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};
