
// Unit conversion types
export interface Unit {
  name: string;
  value: number;
  symbol: string;
}

// Health calculation types
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
export type Gender = 'male' | 'female';

// Geometry types
export type Shape = 'circle' | 'square' | 'rectangle' | 'triangle';

// Financial calculation types
export interface FinancialResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
}

export interface TimeConversion {
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  days: number;
  remainingHours: number;
}

// Length conversion types
export interface LengthUnit extends Unit {}

// Speed conversion types
export interface SpeedUnit extends Unit {}

// Academic calculation types
export interface GradeEntry {
  course: string;
  grade: number;
  credits: number;
}

// Font calculation types
export interface FontSizeCalculation {
  baseFontSize: number;
  scaleFactor: number;
  levels: Record<string, number>;
}
