import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';  // Importar para el select
import { Store } from '@ngrx/store';
import { EmployeeActions } from '../../store/employee.actions';
import { Employee } from '../../models/employee.model';
import { selectToken } from '../../../auth/store/auth.selectors';
import { selectAllEntities } from '../../../entities/store/entity.selectors';  // Seleccionar entidades desde el store
import { EntityActions } from '../../../entities/store/entity.actions';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule  // Importamos el módulo para el select
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  entities$;  // Dejar sin inicializar hasta el constructor

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'edit' | 'view', employee?: Employee }
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: [''],
      salary: ['', Validators.required],
      entityId: ['', Validators.required]  // Campo para seleccionar la entidad
    });

    // Aquí se obtiene las entidades disponibles a través del store
    this.entities$ = this.store.select(selectAllEntities);  // Usar el selector correcto
  }

  ngOnInit(): void {
    if ((this.data.mode === 'edit' || this.data.mode === 'view') && this.data.employee) {
      this.employeeForm.patchValue({
        ...this.data.employee,
        entityId: this.data.employee.entityId  // Poner el id de la entidad seleccionada
      });
    }

    // Aquí se pueden cargar las entidades si es necesario
    this.store.dispatch(EntityActions.loadEntities());  // Cargar las entidades si es necesario
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      // Verifica si el token está disponible antes de hacer el dispatch
      this.store.select(selectToken).subscribe(token => {
        
        if (this.data.mode === 'create') {
          this.store.dispatch(EmployeeActions.createEmployee({ employee: employeeData }));
          this.store.dispatch(EmployeeActions.loadEmployees());
        } else {
          this.store.dispatch(EmployeeActions.updateEmployee({ 
            id: this.data.employee!.id, 
            employee: employeeData 
          }));
          this.store.dispatch(EmployeeActions.loadEmployees());
        }

        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
  
}
