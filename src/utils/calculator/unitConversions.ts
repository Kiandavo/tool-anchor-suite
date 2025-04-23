
import { Unit } from './types';

export const lengthUnits: Unit[] = [
  { name: 'متر', value: 1, symbol: 'm' },
  { name: 'سانتی‌متر', value: 0.01, symbol: 'cm' },
  { name: 'میلی‌متر', value: 0.001, symbol: 'mm' },
  { name: 'کیلومتر', value: 1000, symbol: 'km' },
  { name: 'اینچ', value: 0.0254, symbol: 'in' },
  { name: 'فوت', value: 0.3048, symbol: 'ft' },
  { name: 'یارد', value: 0.9144, symbol: 'yd' },
  { name: 'مایل', value: 1609.34, symbol: 'mi' },
];

export const weightUnits: Unit[] = [
  { name: 'کیلوگرم', value: 1, symbol: 'kg' },
  { name: 'گرم', value: 0.001, symbol: 'g' },
  { name: 'میلی‌گرم', value: 0.000001, symbol: 'mg' },
  { name: 'تن', value: 1000, symbol: 't' },
  { name: 'پوند', value: 0.453592, symbol: 'lb' },
  { name: 'اونس', value: 0.0283495, symbol: 'oz' },
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
