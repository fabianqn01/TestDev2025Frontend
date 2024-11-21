import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../auth/store/auth.selectors';
import { AuthActions } from '../../../auth/store/auth.actions';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  user$ = this.store.select(selectUser);  // Obtenemos el usuario desde el estado global
  dropdownOpen = false;  // Para controlar si el menú desplegable está abierto o cerrado

  logout() {
    this.store.dispatch(AuthActions.logout()); // Disparamos la acción de logout
    this.router.navigate(['/login']);  // Redirigimos a login después del logout
  }

  navigateToLogin() {
    this.router.navigate(['/login']);  // Navegamos a la página de login
  }

  navigateToHome() {
    this.router.navigate(['/home']);  // Navegamos al home
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;  // Alterna el estado del menú desplegable
  }

  navigateToEntities() {
    this.router.navigate(['/entities']); // Asegúrate de que esta ruta exista
  }

  navigateToEmployees() {
    this.router.navigate(['/employees']); // Navega a la página de empleados
  }
}
