// src/app/entities/pages/entity-form/entity-form.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { EntityActions } from '../../store/entity.actions';
import { Entity } from '../../models/entity.model';
import { selectToken } from '../../../auth/store/auth.selectors';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>
      {{ data.mode === 'create' ? 'Crear Nueva Entidad' : 'Editar Entidad' }}
    </h2>
    <mat-dialog-content>
      <form [formGroup]="entityForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="name" required>
          <mat-error *ngIf="entityForm.get('name')?.invalid">
            El nombre es requerido
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Descripción</mat-label>
          <input matInput formControlName="description">
        </mat-form-field>

        <div mat-dialog-actions>
          <button mat-button (click)="onCancel()">Cancelar</button>
          <button 
            mat-raised-button 
            color="primary" 
            type="submit" 
            [disabled]="entityForm.invalid">
            {{ data.mode === 'create' ? 'Crear' : 'Actualizar' }}
          </button>
        </div>
      </form>
    </mat-dialog-content>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class EntityFormComponent implements OnInit {
  entityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<EntityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'edit', entity?: Entity }
  ) {
    this.entityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit' && this.data.entity) {
      this.entityForm.patchValue(this.data.entity);
    }
  }

  onSubmit(): void {
    if (this.entityForm.valid) {
      const entityData = this.entityForm.value;
  
      // Verifica si el token está disponible antes de hacer el dispatch
      this.store.select(selectToken).subscribe(token => {
        console.log('Token en el componente:', token);  // Verifica que el token esté aquí
  
        if (this.data.mode === 'create') {
          this.store.dispatch(EntityActions.createEntity({ entity: entityData }));
          this.store.dispatch(EntityActions.loadEntities());
        } else {
          this.store.dispatch(EntityActions.updateEntity({ 
            id: this.data.entity!.id, 
            entity: entityData 
          }));
          this.store.dispatch(EntityActions.loadEntities());
        }
  
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}