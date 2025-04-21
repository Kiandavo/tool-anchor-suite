
export const calculateTip = (amount: number, tipPercentage: number): { tip: number; total: number } => {
  const tip = (amount * tipPercentage) / 100;
  return {
    tip: Number(tip.toFixed(2)),
    total: Number((amount + tip).toFixed(2))
  };
};

export const calculateArea = (shape: 'circle' | 'square' | 'rectangle' | 'triangle', dimensions: number[]): number => {
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

export interface Unit {
  name: string;
  value: number;
  symbol: string;
}

export const lengthUnits: Unit[] = [
  { name: 'متر', value: 1, symbol: 'm' },
  { name: 'سانتی‌متر', value: 0.01, symbol: 'cm' },
  { name: 'میلی‌متر', value: 0.001, symbol: 'mm' },
  { name: 'کیلومتر', value: 1000, symbol: 'km' },
];

export const currencies: Unit[] = [
  { name: 'تومان', value: 1, symbol: 'تومان' },
  { name: 'دلار', value: 52000, symbol: '$' },
  { name: 'یورو', value: 56000, symbol: '€' },
  { name: 'پوند', value: 65000, symbol: '£' },
];

export const convertUnit = (value: number, fromUnit: Unit, toUnit: Unit): number => {
  const baseValue = value * fromUnit.value;
  return Number((baseValue / toUnit.value).toFixed(4));
};

