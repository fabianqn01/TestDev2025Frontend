import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { EntityListComponent } from './entities/components/entity-list/entity-list.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { EntityFormComponent } from './entities/components/entity-form/entity-form.component';
import { EmployeeListComponent } from './employees/components/employee-list/employee-list.component';  // Asegúrate de importar el componente de empleados
import { EmployeeFormComponent } from './employees/components/employee-form/employee-form.component';  // Asegúrate de importar el componente de formularios de empleados

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'entities', 
    component: EntityListComponent 
  },
  { 
    path: 'entities/create', 
    component: EntityFormComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'entities/edit/:id', 
    component: EntityFormComponent, 
    canActivate: [AdminGuard] 
  },
  
  // Rutas para empleados
  { path: 'employees', component: EmployeeListComponent },  // Ruta para ver la lista de empleados
  { 
    path: 'employees/create', 
    component: EmployeeFormComponent, 
    canActivate: [AdminGuard]  // Si es necesario, proteger con el guardia
  },
  { 
    path: 'employees/edit/:id', 
    component: EmployeeFormComponent, 
    canActivate: [AdminGuard]  // Si es necesario, proteger con el guardia
  }
];
