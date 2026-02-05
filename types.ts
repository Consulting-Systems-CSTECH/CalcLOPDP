
export type Category = 'titulares' | 'volumen' | 'datos' | 'frecuencia' | 'permanencia' | 'geografia';

export interface Option {
  label: string;
  points: number;
  description?: string;
}

export interface DirectCheck {
  id: string;
  label: string;
  description: string;
}

export interface CalculatorState {
  titulares: number;
  volumen: number;
  datos: number;
  frecuencia: number;
  permanencia: number;
  geografia: number;
  directQualifications: Set<string>;
}
