// src/app/auth/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectRoles } from '../store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectRoles).pipe(
      take(1),
      map(roles => {
        const isAdmin = roles?.includes('Admin');
        if (isAdmin) {
          return true;
        } else {
          // Opcional: Puedes mostrar un mensaje de error o redirigir
          // this.router.navigate(['/unauthorized']);
          return false;
        }
      })
    );
  }
}