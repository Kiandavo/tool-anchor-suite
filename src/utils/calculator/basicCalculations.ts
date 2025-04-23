
import { Shape } from './types';

export const calculateTip = (amount: number, tipPercentage: number): { tip: number; total: number } => {
  const tip = (amount * tipPercentage) / 100;
  return {
    tip: Number(tip.toFixed(2)),
    total: Number((amount + tip).toFixed(2))
  };
};

export const calculateArea = (shape: Shape, dimensions: number[]): number => {
  switch (shape) {
    case 'circle':
      return Number((Math.PI * Math.pow(dimensions[0], 2)).toFixed(2));
    case 'square':
      return Number((dimensions[0] * dimensions[0]).toFixed(2));
    case 'rectangle':
      return Number((dimensions[0] * dimensions[1]).toFixed(2));
    case 'triangle':
      return Number((0.5 * dimensions[0] * dimensions[1]).toFixed(2));
    default:
      return 0;
  }
};
