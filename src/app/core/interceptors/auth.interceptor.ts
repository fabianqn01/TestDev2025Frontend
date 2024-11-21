import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '../../auth/store/auth.selectors';
import { take, switchMap } from 'rxjs/operators';

// Cambiar a función con firma HttpInterceptorFn
export function authInterceptorFn(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const store = inject(Store);  // Usar `inject` para obtener el Store

  console.log('Interceptor ejecutado');
  
  return store.select(selectToken).pipe(
    take(1),
    switchMap(token => {
      console.log('Token desde store:', token);
      if (token) {
        const authRequest = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(authRequest);
      }
      return next(req);
    })
  );
}
