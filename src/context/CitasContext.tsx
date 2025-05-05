import React, { createContext, useContext, useState } from 'react';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  peso: string;
  edad: string;
  dueño: string;
  apellidoDuenio: string;
  telefonoDuenio: string;
  correoDuenio: string;
  direccionDuenio: string;
  cedulaDuenio: string;
}

interface Cita {
  id: number;
  cedulaDuenio: string;
  nombreMascota: string;
  tipoMascota: string;
  raza: string;
  edad: string;
  dueño: string;
  telefonoDuenio: string;
  motivo: string;
  tratamiento: string;
  vacunasAdministradas: string;
  notasAdicionales: string;
  diagnostico: string;
  seguimiento: string;
  fecha: string;
  hora: string;
}

interface CitasContextType {
  mascotas: Mascota[];
  citas: Cita[];
  agregarMascota: (nuevaMascota: Omit<Mascota, 'id'>) => void;
  agregarCita: (nuevaCita: Omit<Cita, 'id'>) => void;
}

const CitasContext = createContext<CitasContextType | undefined>(undefined);

export const CitasProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mascotas, setMascotas] = useState<Mascota[]>([
    // Ejemplo de mascota pre-registrada
    {
      id: 1,
      nombre: 'Firulais',
      especie: 'Perro',
      raza: 'Labrador',
      sexo: 'Macho',
      peso: '25 kg',
      edad: '3 años',
      dueño: 'Juan Pérez',
      apellidoDuenio: 'Pérez',
      telefonoDuenio: '5551234567',
      correoDuenio: 'juan@example.com',
      direccionDuenio: 'Calle Falsa 123',
      cedulaDuenio: '1234567890'
    }
  ]);

  const [citas, setCitas] = useState<Cita[]>([
    // Ejemplo de cita pre-registrada
    {
      id: 1,
      cedulaDuenio: '1234567890',
      nombreMascota: 'Firulais',
      tipoMascota: 'Perro',
      raza: 'Labrador',
      edad: '3 años',
      dueño: 'Juan Pérez',
      telefonoDuenio: '5551234567',
      motivo: 'Consulta general',
      tratamiento: 'Ninguno',
      vacunasAdministradas: 'Rabia',
      notasAdicionales: 'El paciente se mostró nervioso',
      diagnostico: 'Saludable',
      seguimiento: 'No',
      fecha: '2025-04-30',
      hora: '10:30'
    }
  ]);
  
  const agregarMascota = (nuevaMascota: Omit<Mascota, 'id'>) => {
    setMascotas(prev => [...prev, { ...nuevaMascota, id: Date.now() }]);
  };

  const agregarCita = (nuevaCita: Omit<Cita, 'id'>) => {
    setCitas(prev => [...prev, { ...nuevaCita, id: Date.now() }]);
  };

  return (
    <CitasContext.Provider value={{ mascotas, citas, agregarMascota, agregarCita }}>
      {children}
    </CitasContext.Provider>
  );
};

export const useCitas = () => {
  const context = useContext(CitasContext);
  if (!context) {
    throw new Error('useCitas debe ser usado dentro de un CitasProvider');
  }
  return context;
};