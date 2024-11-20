import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => {
            this.router.navigate(['/home']);
            // Almacena los roles en el estado al hacer login
            console.log(response.data);
            return AuthActions.loginSuccess({ response});
          }),
          catchError(error => 
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );
}  