import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Declaramos que el componente es independiente
  imports: [CommonModule, RouterModule, HomeComponent, LoginComponent], // Importamos RouterModule y los componentes
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestDev2025Frontend';

  // Definimos las rutas directamente aquí
  routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/home' }
  ];
}
