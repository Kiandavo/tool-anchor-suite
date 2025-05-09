
export type UniverseType = 'utopian' | 'dystopian' | 'neutral' | 'bizarre';

export interface ParallelUniverse {
  id: number;
  name: string;
  description: string;
  characteristics: string[];
  youInThisUniverse: string;
  probability: number;
  type: UniverseType;
}

// New types for enhanced fortune-telling features
export interface IChing {
  id: number;
  hexagram: number;
  name: string;
  description: string;
  interpretation: string;
  changingLines: number[];
}

export interface NumerologyResult {
  lifePathNumber: number;
  destinyNumber: number;
  personalityNumber: number;
  soulNumber: number;
  interpretation: string;
}

export interface DreamInterpretation {
  symbols: {[key: string]: string};
  generalMeaning: string;
  personalAdvice: string;
}
