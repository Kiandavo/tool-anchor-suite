
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
