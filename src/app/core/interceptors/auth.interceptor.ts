import { Injectable } from '@angular/core';
import { 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpInterceptor 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '../../auth/store/auth.selectors';
import { take, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap(token => {
        if (token) {
          const authRequest = request.clone({
            setHeaders: { 
              Authorization: `Bearer ${token}` 
            }
          });
          return next.handle(authRequest);
        }
        return next.handle(request);
      })
    );
  }
}