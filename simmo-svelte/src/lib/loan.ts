import { type Percentage, type Rate, toRate, toPercentage } from './types/rate';
import { yearToMonth, type Year } from './types/time';

interface LoanRequest {
  amount: number;
  rate: Percentage;
  duration: Year;
  monthlyIncome: number;
}

interface LoanResults {
  monthlyPayment: number;
  totalCost: number;
  debtRatio: Percentage;
}

const monthlyRateFromAnnualPercentageRate = (rate: Percentage): Rate => {
  return toRate(rate / 100 / 12);
};

const computeMonthlyPayment = (amount: number, rate: Percentage, duration: Year): number => {
  const monthlyRate = monthlyRateFromAnnualPercentageRate(rate);
  return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -yearToMonth(duration)));
};

const computeTotalLoanCost = (amount: number, duration: Year, monthlyPayment: number): number => {
  return monthlyPayment * yearToMonth(duration) - amount;
};

export const computeLoanResults = (loanRequest: LoanRequest): LoanResults => {
  const { amount, rate, duration, monthlyIncome } = loanRequest;
  const monthlyPayment = computeMonthlyPayment(amount, rate, duration);
  const totalCost = computeTotalLoanCost(amount, duration, monthlyPayment);
  const debtRatio = toPercentage((monthlyPayment / monthlyIncome) * 100);
  return { monthlyPayment, totalCost, debtRatio };
};
