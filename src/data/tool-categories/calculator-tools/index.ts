
import { Tool } from '@/types/tool-types';
import { basicCalculators } from './basic-calculators';
import { healthCalculators } from './health-calculators';
import { financialCalculators } from './financial-calculators';
import { unitConverters } from './unit-converters';
import { dateTimeCalculators } from './date-time-calculators';
import { scientificCalculators } from './scientific-calculators';

export const calculatorTools: Tool[] = [
  ...basicCalculators,
  ...healthCalculators,
  ...financialCalculators,
  ...unitConverters,
  ...dateTimeCalculators,
  ...scientificCalculators
];
