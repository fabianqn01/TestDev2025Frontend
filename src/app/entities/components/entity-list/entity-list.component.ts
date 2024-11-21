// src/app/entities/pages/entity-list/entity-list.component.ts
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EntityActions } from '../../store/entity.actions';
import { selectAllEntities, selectEntityLoading } from '../../store/entity.selectors';
import { selectRoles } from '../../../auth/store/auth.selectors';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { Entity } from '../../models/entity.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-entity-list',
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
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Entity> = new MatTableDataSource();
  private readonly store = inject(Store);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  entities$ = this.store.select(selectAllEntities);
  loading$ = this.store.select(selectEntityLoading);
  roles$ = this.store.select(selectRoles);

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(EntityActions.loadEntities());
    
    this.entities$.subscribe(entities => {
      this.dataSource.data = entities;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EntityFormComponent, {
      width: '500px',
      data: { mode: 'create' }
    });
  }

  openEditDialog(entity: Entity): void {
    const dialogRef = this.dialog.open(EntityFormComponent, {
      width: '500px',
      data: { mode: 'edit', entity }
    });
  }

  openViewDialog(entity: Entity): void {
    const dialogRef = this.dialog.open(EntityFormComponent, {
      width: '500px',
      data: { mode: 'view', entity } as { mode: 'create' | 'edit' | 'view', entity?: Entity }
    });
  }

  confirmDelete(entity: Entity): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de eliminar la entidad "${entity.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(EntityActions.deleteEntity({ id: entity.id }));
      }
    });
  }
}