export interface Employee {
    id: number;
    name: string;
    position: string;
    salary: number;
    entityId: number;  // El ID de la entidad a la que pertenece el empleado
    entityName?: string; // Se añadirá dinámicamente
  }