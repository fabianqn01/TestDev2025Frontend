import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Importar FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Simulación de login (esto debería conectarse con el AuthService)
  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      // Redirigir a la página de inicio o dashboard si el login es exitoso
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales inválidas');
    }
  }
}
