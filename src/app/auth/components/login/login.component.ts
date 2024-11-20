import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth.actions';
import { selectError, selectLoading, selectRoles} from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegúrate de incluir FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly store = inject(Store);

  email: string = '';
  password: string = '';
  
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  roles$ = this.store.select(selectRoles);

  login() {
    if (this.email && this.password) {
      this.store.dispatch(AuthActions.login({
        credentials: {
          email: this.email,
          password: this.password
        }
      }));
    }
  }
}
