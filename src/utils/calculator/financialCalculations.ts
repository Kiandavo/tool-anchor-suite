
import { FinancialResult } from './types';

export const calculateMortgageRent = (amount: number, interestRate: number, type: 'mortgage-to-rent' | 'rent-to-mortgage'): number => {
  const monthlyInterestRate = interestRate / 12 / 100;
  
  if (type === 'mortgage-to-rent') {
    return Math.round(amount * monthlyInterestRate);
  } else {
    return Math.round(amount / monthlyInterestRate);
  }
};

export const calculateInvestment = (
  principal: number,
  annualRate: number,
  years: number,
  contributionAmount: number,
  contributionFrequency: 'monthly' | 'yearly'
): FinancialResult => {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  let balance = principal;
  let totalContributions = principal;

  if (contributionFrequency === 'monthly') {
    for (let i = 1; i <= totalMonths; i++) {
      balance = balance * (1 + monthlyRate) + contributionAmount;
      totalContributions += contributionAmount;
    }
  } else {
    for (let i = 1; i <= years; i++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate);
      }
      balance += contributionAmount;
      totalContributions += contributionAmount;
    }
  }

  const finalAmount = Math.round(balance);
  
  return {
    finalAmount,
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(finalAmount - totalContributions)
  };
};

export const calculateLoan = (
  loanAmount: number, 
  interestRate: number, 
  loanTerm: number,
  additionalMonthlyPayment: number = 0
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffTimeMonths: number;
} => {
  const monthlyRate = interestRate / 100 / 12;
  const termMonths = loanTerm;
  
  // Standard loan payment calculation formula
  const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  
  // Calculate early payoff if additional payment is provided
  let remainingBalance = loanAmount;
  let monthsToPayoff = 0;
  let totalPayment = 0;
  
  while (remainingBalance > 0 && monthsToPayoff < termMonths * 2) { // Prevent infinite loops
    monthsToPayoff++;
    
    const interestForMonth = remainingBalance * monthlyRate;
    let principalForMonth = monthlyPayment - interestForMonth;
    
    // Add additional payment
    if (additionalMonthlyPayment > 0) {
      principalForMonth += additionalMonthlyPayment;
    }
    
    // Ensure we don't pay more than the remaining balance
    if (principalForMonth > remainingBalance) {
      principalForMonth = remainingBalance;
    }
    
    remainingBalance -= principalForMonth;
    totalPayment += (principalForMonth + interestForMonth);
  }
  
  // If no additional payment, use the standard formula
  if (additionalMonthlyPayment <= 0) {
    totalPayment = monthlyPayment * termMonths;
    monthsToPayoff = termMonths;
  }
  
  const totalInterest = totalPayment - loanAmount;
  
  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    payoffTimeMonths: monthsToPayoff
  };
};
