import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EmployeeActions } from '../../store/employee.actions'; // Store de empleados
import { selectAllEmployees, selectEmployeeLoading } from '../../store/employee.selectors'; // Selectores de empleados
import { selectRoles } from '../../../auth/store/auth.selectors';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../models/employee.model'; // Modelo de empleado
import { selectAllEntities } from '../../../entities/store/entity.selectors'; // Seleccionamos todas las entidades
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EntityActions } from '../../../entities/store/entity.actions';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatButtonModule, 
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'position', 'salary', 'entityName', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  private readonly store = inject(Store);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employees$ = this.store.select(selectAllEmployees);
  entities$ = this.store.select(selectAllEntities); // Seleccionamos todas las entidades
  loading$ = this.store.select(selectEmployeeLoading);
  roles$ = this.store.select(selectRoles);

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
    this.store.dispatch(EntityActions.loadEntities()); // Asegúrate de cargar las entidades

    // Suscripción a empleados y entidades
    this.employees$.subscribe(employees => {
      this.entities$.subscribe(entities => {
        // Asocia el nombre de la entidad al empleado
        const employeesWithEntity = employees.map(employee => {
          const entity = entities.find(e => e.id === employee.entityId);
          return { ...employee, entityName: entity ? entity.name : 'Desconocida' };
        });

        // Asigna los empleados con el nombre de la entidad a la fuente de datos de la tabla
        this.dataSource.data = employeesWithEntity;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '500px',
      data: { mode: 'create' }
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '500px',
      data: { mode: 'edit', employee }
    });
  }

  openViewDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '500px',
      data: { mode: 'view', employee }
    });
  }

  confirmDelete(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de eliminar el empleado "${employee.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(EmployeeActions.deleteEmployee({ id: employee.id }));
      }
    });
  }
}
