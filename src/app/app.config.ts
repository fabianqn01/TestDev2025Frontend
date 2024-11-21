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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideAnimations(),
    provideStore({
      auth: authReducer,
      entities: entityReducer
    }),
    provideEffects([AuthEffects, EntityEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};