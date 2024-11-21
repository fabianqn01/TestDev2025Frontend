import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { EntityListComponent } from './entities/components/entity-list/entity-list.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { EntityFormComponent } from './entities/components/entity-form/entity-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'entities', 
    component: EntityListComponent 
    // Sin guardia, permite acceso anónimo para listar
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
  }
];