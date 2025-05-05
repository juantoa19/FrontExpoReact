// AgendarCitasTypes.ts
export interface Cita {
  id?: string;
  nombreMascota: string;
  tipoMascota: string;
  raza: string;
  edad: string;
  cedulaDuenio: string;
  motivo: string;
  observaciones: string;
  diagnostico: string;
  tratamiento: string;
  vacunasAdministradas: string;
  notasAdicionales: string;
  seguimiento: string;
  fecha: string;
  hora: string;
}

export interface CitaFormData {
  animal: string;
  fecha: string;
  hora: string;
  motivo: string;
  diagnostico: string;
  requiereSeguimiento: boolean;
  tratamiento: string;
  vacunasAdministradas: string;
  notasAdicionales: string;
}