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

  username: string = '';
  password: string = '';
  
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  login() {
    if (this.username && this.password) {
      this.store.dispatch(AuthActions.login({
        credentials: {
          username: this.username,
          password: this.password
        }
      }));
    }
  }
}