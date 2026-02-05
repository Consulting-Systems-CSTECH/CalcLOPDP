
import { Option, DirectCheck } from './types';

export const SCORING_RULES: Record<string, Option[]> = {
  titulares: [
    { label: 'Hasta 1.000', points: 1 },
    { label: 'De 1.001 a 10.000', points: 2 },
    { label: 'De 10.001 a 100.000', points: 3 },
    { label: 'Desde 100.001', points: 4 },
  ],
  volumen: [
    { label: 'Hasta 10 tipos de datos', points: 0.5 },
    { label: 'Entre 11 y 30 tipos', points: 1 },
    { label: 'Entre 31 y 100 tipos', points: 2 },
    { label: 'Desde 101 tipos de datos', points: 3 },
  ],
  datos: [
    { label: 'Únicamente categorías básicas', points: 0.5 },
    { label: 'Una categoría especial', points: 2, description: 'Salud, biometría, menores, etc.' },
    { label: 'Más de una categoría especial', points: 3, description: 'Datos penales, vulnerables, etc.' },
  ],
  frecuencia: [
    { label: 'Puntual', points: 0.5 },
    { label: 'Periódica', points: 1 },
    { label: 'Continua o en tiempo real', points: 2 },
  ],
  permanencia: [
    { label: 'Ocasional', points: 0.5 },
    { label: 'Temporal', points: 1 },
    { label: 'Prolongada', points: 2 },
  ],
  geografia: [
    { label: 'Local', points: 1, description: 'Provincial o Cantonal' },
    { label: 'Nacional', points: 2, description: 'Varias provincias o todo el país' },
    { label: 'Global o transfronteriza', points: 3, description: 'Tratamiento fuera del territorio' },
  ],
};

export const DIRECT_QUALIFICATIONS: DirectCheck[] = [
  { id: 'health', label: 'Salud / Asistencial', description: 'Tratamientos en marcos sanitarios, seguros médicos o gestión de historiales clínicos.' },
  { id: 'profiling', label: 'Perfilamiento Automatizado', description: 'Evaluación sistemática de aspectos personales con efectos jurídicos o impacto significativo.' },
  { id: 'surveillance', label: 'Videovigilancia Pública', description: 'Observación o monitoreo sistemático en zonas de acceso público.' },
  { id: 'biometrics', label: 'Biometría / Geolocalización', description: 'Cualquier tratamiento de datos biométricos o geolocalización constante.' },
  { id: 'credit', label: 'Información Crediticia', description: 'Tratamiento estructural para valorar solvencia patrimonial o riesgo económico.' },
  { id: 'children', label: 'Menores de Edad', description: 'Tratamiento sistemático de datos de niñas, niños o adolescentes.' },
  { id: 'transfers', label: 'Transferencias Sistemáticas', description: 'Flujos continuos o estructurales de información entre responsables/encargados.' },
  { id: 'courier', label: 'Mensajería / Courier', description: 'Servicios de mensajería acelerada, expresa o de paquetería.' },
];
