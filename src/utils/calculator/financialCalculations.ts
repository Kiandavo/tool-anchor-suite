
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
