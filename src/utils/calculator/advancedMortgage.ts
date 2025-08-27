/**
 * Advanced Mortgage and Rent Calculator
 * Comprehensive financial calculations for Iranian real estate
 */

export interface MortgageCalculationResult {
  monthlyRent: number;
  annualRent: number;
  totalCost: number;
  savings: number;
  recommendation: string;
  details: MortgageDetail[];
}

export interface RentCalculationResult {
  mortgageAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  breakEvenMonths: number;
  recommendation: string;
  details: RentDetail[];
}

export interface MortgageDetail {
  month: number;
  rent: number;
  cumulativeRent: number;
  interestRate: number;
}

export interface RentDetail {
  year: number;
  annualRent: number;
  cumulativeRent: number;
  equivalentMortgage: number;
}

export interface AmortizationSchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface ComparisonResult {
  option1: MortgageOption;
  option2: MortgageOption;
  betterOption: 'option1' | 'option2';
  savings: number;
  recommendation: string;
}

export interface MortgageOption {
  type: 'rent' | 'mortgage';
  monthlyPayment: number;
  totalCost: number;
  initialCost: number;
  description: string;
}

export interface AffordabilityResult {
  maxMortgage: number;
  maxRent: number;
  recommendedMortgage: number;
  recommendedRent: number;
  debtToIncomeRatio: number;
  isAffordable: boolean;
  recommendations: string[];
}

/**
 * Calculate mortgage to rent conversion with advanced analysis
 */
export function calculateAdvancedMortgageToRent(
  mortgageAmount: number,
  interestRate: number,
  duration: number = 12,
  inflationRate: number = 15,
  options: {
    includeInflation?: boolean;
    calculateProjection?: boolean;
    yearCount?: number;
  } = {}
): MortgageCalculationResult {
  const monthlyRate = interestRate / 100 / 12;
  const baseMonthlyRent = mortgageAmount * monthlyRate;
  
  const details: MortgageDetail[] = [];
  let totalCost = 0;
  
  // Calculate detailed breakdown
  for (let month = 1; month <= duration; month++) {
    let adjustedRent = baseMonthlyRent;
    
    if (options.includeInflation) {
      const monthlyInflation = inflationRate / 100 / 12;
      adjustedRent = baseMonthlyRent * Math.pow(1 + monthlyInflation, month - 1);
    }
    
    totalCost += adjustedRent;
    
    details.push({
      month,
      rent: Math.round(adjustedRent),
      cumulativeRent: Math.round(totalCost),
      interestRate: interestRate * (month / duration) // Dynamic rate for analysis
    });
  }
  
  const annualRent = baseMonthlyRent * 12;
  const potentialSavings = mortgageAmount * 0.1; // Assuming 10% potential investment return
  
  let recommendation = '';
  if (totalCost < potentialSavings) {
    recommendation = 'پرداخت اجاره با توجه به شرایط فعلی بازار توصیه می‌شود.';
  } else {
    recommendation = 'سرمایه‌گذاری در خرید ملک اقتصادی‌تر است.';
  }
  
  return {
    monthlyRent: Math.round(baseMonthlyRent),
    annualRent: Math.round(annualRent),
    totalCost: Math.round(totalCost),
    savings: Math.round(potentialSavings),
    recommendation,
    details
  };
}

/**
 * Calculate rent to mortgage conversion with advanced analysis
 */
export function calculateAdvancedRentToMortgage(
  monthlyRent: number,
  interestRate: number,
  duration: number = 12,
  propertyAppreciation: number = 8,
  options: {
    includePropertyGrowth?: boolean;
    calculateBreakEven?: boolean;
    yearCount?: number;
  } = {}
): RentCalculationResult {
  const monthlyRate = interestRate / 100 / 12;
  const baseMortgageAmount = monthlyRent / monthlyRate;
  
  const details: RentDetail[] = [];
  let cumulativeRent = 0;
  let breakEvenMonths = 0;
  
  // Calculate year-by-year analysis
  const yearCount = options.yearCount || 5;
  for (let year = 1; year <= yearCount; year++) {
    let adjustedRent = monthlyRent * 12;
    
    if (options.includePropertyGrowth) {
      adjustedRent = monthlyRent * 12 * Math.pow(1 + propertyAppreciation / 100, year - 1);
    }
    
    cumulativeRent += adjustedRent;
    const equivalentMortgage = cumulativeRent / monthlyRate / 12;
    
    if (breakEvenMonths === 0 && cumulativeRent >= baseMortgageAmount) {
      breakEvenMonths = year * 12;
    }
    
    details.push({
      year,
      annualRent: Math.round(adjustedRent),
      cumulativeRent: Math.round(cumulativeRent),
      equivalentMortgage: Math.round(equivalentMortgage)
    });
  }
  
  const totalInterest = cumulativeRent - baseMortgageAmount;
  const monthlyPayment = monthlyRent;
  
  let recommendation = '';
  if (breakEvenMonths <= 36) {
    recommendation = 'خرید ملک با توجه به نرخ بازگشت سرمایه توصیه می‌شود.';
  } else {
    recommendation = 'اجاره کردن در شرایط فعلی مقرون‌به‌صرفه‌تر است.';
  }
  
  return {
    mortgageAmount: Math.round(baseMortgageAmount),
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    breakEvenMonths: breakEvenMonths || yearCount * 12,
    recommendation,
    details
  };
}

/**
 * Generate amortization schedule for mortgage
 */
export function generateAmortizationSchedule(
  loanAmount: number,
  interestRate: number,
  termMonths: number,
  additionalPayment: number = 0
): AmortizationSchedule[] {
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  
  let remainingBalance = loanAmount;
  const schedule: AmortizationSchedule[] = [];
  
  for (let month = 1; month <= termMonths && remainingBalance > 0; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    let principalPayment = monthlyPayment - interestPayment + additionalPayment;
    
    if (principalPayment > remainingBalance) {
      principalPayment = remainingBalance;
    }
    
    remainingBalance -= principalPayment;
    
    schedule.push({
      month,
      payment: Math.round(monthlyPayment + additionalPayment),
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      remainingBalance: Math.round(Math.max(0, remainingBalance))
    });
  }
  
  return schedule;
}

/**
 * Compare two mortgage/rent options
 */
export function compareMortgageOptions(
  option1: {
    type: 'rent' | 'mortgage';
    amount: number;
    interestRate: number;
    termMonths?: number;
  },
  option2: {
    type: 'rent' | 'mortgage';
    amount: number;
    interestRate: number;
    termMonths?: number;
  },
  comparisonPeriodMonths: number = 60
): ComparisonResult {
  const calculateOptionCost = (option: typeof option1) => {
    if (option.type === 'rent') {
      return {
        monthlyPayment: option.amount,
        totalCost: option.amount * comparisonPeriodMonths,
        initialCost: 0,
        description: `اجاره ماهیانه ${option.amount.toLocaleString('fa-IR')} تومان`
      };
    } else {
      const monthlyRate = option.interestRate / 100 / 12;
      const termMonths = option.termMonths || comparisonPeriodMonths;
      const monthlyPayment = (option.amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
      const totalInterest = (monthlyPayment * Math.min(comparisonPeriodMonths, termMonths)) - 
        (option.amount * Math.min(comparisonPeriodMonths, termMonths) / termMonths);
      
      return {
        monthlyPayment: Math.round(monthlyPayment),
        totalCost: Math.round(monthlyPayment * Math.min(comparisonPeriodMonths, termMonths)),
        initialCost: Math.round(option.amount * 0.2), // Assuming 20% down payment
        description: `وام ${option.amount.toLocaleString('fa-IR')} تومان با نرخ ${option.interestRate}%`
      };
    }
  };
  
  const opt1Result = calculateOptionCost(option1);
  const opt2Result = calculateOptionCost(option2);
  
  const betterOption = opt1Result.totalCost < opt2Result.totalCost ? 'option1' : 'option2';
  const savings = Math.abs(opt1Result.totalCost - opt2Result.totalCost);
  
  let recommendation = '';
  if (betterOption === 'option1') {
    recommendation = `گزینه اول ${savings.toLocaleString('fa-IR')} تومان صرفه‌جویی دارد.`;
  } else {
    recommendation = `گزینه دوم ${savings.toLocaleString('fa-IR')} تومان صرفه‌جویی دارد.`;
  }
  
  return {
    option1: { ...opt1Result, type: option1.type },
    option2: { ...opt2Result, type: option2.type },
    betterOption,
    savings: Math.round(savings),
    recommendation
  };
}

/**
 * Calculate affordability based on income
 */
export function calculateAffordability(
  monthlyIncome: number,
  monthlyExpenses: number,
  downPaymentAvailable: number,
  interestRate: number,
  maxDebtRatio: number = 30
): AffordabilityResult {
  const netIncome = monthlyIncome - monthlyExpenses;
  const maxMonthlyPayment = (monthlyIncome * maxDebtRatio) / 100;
  const safeMonthlyPayment = netIncome * 0.3; // Conservative 30% of net income
  
  const monthlyRate = interestRate / 100 / 12;
  const termMonths = 360; // 30 years standard
  
  // Calculate maximum loan amount
  const maxLoanAmount = maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -termMonths)) / monthlyRate;
  const maxMortgage = maxLoanAmount + downPaymentAvailable;
  
  const safeLoanAmount = safeMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -termMonths)) / monthlyRate;
  const recommendedMortgage = safeLoanAmount + downPaymentAvailable;
  
  const debtToIncomeRatio = (maxMonthlyPayment / monthlyIncome) * 100;
  const isAffordable = debtToIncomeRatio <= maxDebtRatio && netIncome > 0;
  
  const recommendations: string[] = [];
  if (!isAffordable) {
    recommendations.push('درآمد شما برای خرید ملک در نظر گرفته شده کافی نیست.');
    recommendations.push('پیشنهاد می‌شود هزینه‌های ماهیانه را کاهش دهید.');
  }
  if (downPaymentAvailable < maxMortgage * 0.2) {
    recommendations.push('پیش‌پرداخت بیشتری جمع‌آوری کنید تا شرایط بهتری دریافت کنید.');
  }
  if (debtToIncomeRatio > 25) {
    recommendations.push('نسبت بدهی به درآمد شما بالاست. احتیاط کنید.');
  }
  
  return {
    maxMortgage: Math.round(maxMortgage),
    maxRent: Math.round(maxMonthlyPayment),
    recommendedMortgage: Math.round(recommendedMortgage),
    recommendedRent: Math.round(safeMonthlyPayment),
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
    isAffordable,
    recommendations
  };
}

/**
 * Get market rates for different Iranian cities
 */
export function getMarketRates(): Record<string, { rentRate: number; mortgageRate: number; appreciation: number }> {
  return {
    'تهران': { rentRate: 28, mortgageRate: 26, appreciation: 12 },
    'اصفهان': { rentRate: 25, mortgageRate: 24, appreciation: 8 },
    'مشهد': { rentRate: 24, mortgageRate: 23, appreciation: 7 },
    'شیراز': { rentRate: 23, mortgageRate: 22, appreciation: 6 },
    'تبریز': { rentRate: 22, mortgageRate: 21, appreciation: 5 },
    'کرج': { rentRate: 26, mortgageRate: 25, appreciation: 10 },
    'اهواز': { rentRate: 21, mortgageRate: 20, appreciation: 4 },
    'قم': { rentRate: 24, mortgageRate: 23, appreciation: 7 },
    'رشت': { rentRate: 20, mortgageRate: 19, appreciation: 3 },
    'کرمان': { rentRate: 19, mortgageRate: 18, appreciation: 3 }
  };
}