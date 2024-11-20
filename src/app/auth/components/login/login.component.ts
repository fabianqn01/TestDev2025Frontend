import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth.actions';
import { selectError, selectLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly store = inject(Store);

  email: string = '';
  password: string = '';
  
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

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