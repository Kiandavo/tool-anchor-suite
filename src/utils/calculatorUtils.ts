
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

// Function to calculate calories based on Harris-Benedict equation
export const calculateCalories = (
  gender: 'male' | 'female',
  weight: number,
  height: number,
  age: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
): number => {
  // Base Metabolic Rate calculation using Harris-Benedict equation
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Activity multiplier
  const activityMultipliers = {
    'sedentary': 1.2,      // Little or no exercise
    'light': 1.375,        // Light exercise 1-3 days/week
    'moderate': 1.55,      // Moderate exercise 3-5 days/week
    'active': 1.725,       // Hard exercise 6-7 days/week
    'very-active': 1.9     // Very hard exercise & physical job or 2x training
  };

  // Total Daily Energy Expenditure (TDEE)
  const tdee = bmr * activityMultipliers[activityLevel];
  return Math.round(tdee);
};

// Function to convert between time units
export const convertTime = (hours: number, minutes: number, seconds: number): {
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  days: number;
  remainingHours: number;
} => {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const days = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;

  return {
    totalSeconds,
    totalMinutes,
    totalHours,
    days,
    remainingHours
  };
};

// Function to calculate mortgage and rent conversion
export const calculateMortgageRent = (amount: number, interestRate: number, type: 'mortgage-to-rent' | 'rent-to-mortgage'): number => {
  const monthlyInterestRate = interestRate / 12 / 100;
  
  if (type === 'mortgage-to-rent') {
    // Convert mortgage deposit to monthly rent
    return Math.round(amount * monthlyInterestRate);
  } else {
    // Convert monthly rent to mortgage deposit
    return Math.round(amount / monthlyInterestRate);
  }
};

// Function to calculate investment returns
export const calculateInvestment = (
  principal: number,
  annualRate: number,
  years: number,
  contributionAmount: number,
  contributionFrequency: 'monthly' | 'yearly'
): {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
} => {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  let balance = principal;
  let totalContributions = principal;

  if (contributionFrequency === 'monthly') {
    for (let i = 1; i <= totalMonths; i++) {
      balance = balance * (1 + monthlyRate) + contributionAmount;
      totalContributions += contributionAmount;
    }
  } else { // yearly
    for (let i = 1; i <= years; i++) {
      // Compound monthly, but add contribution yearly
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate);
      }
      balance += contributionAmount;
      totalContributions += contributionAmount;
    }
  }

  return {
    finalAmount: Math.round(balance),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(balance - totalContributions)
  };
};
