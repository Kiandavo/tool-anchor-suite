
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
