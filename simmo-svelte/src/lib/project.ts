import { computeMonthlyLoanRate, computeMonthlyPayment, amortizationEvolution } from './utils';

export interface ProjectSettings {
  yearlyLoanRate: number;
  loanDuration: number;
  totalAmount: number;
  netMonthlyIncome: number;
}

export interface ProjectResults {
  debtLoanRatio: number;
  monthlyLoanCost: number;
  amortizationTable: ReturnType<typeof amortizationEvolution>;
}

export const computeProjectResults = (settings: ProjectSettings): ProjectResults => {
  const loanDurationInMonths = settings.loanDuration * 12;

  const monthlyLoanRate = computeMonthlyLoanRate(settings.yearlyLoanRate);
  const monthlyLoanCost = computeMonthlyPayment(
    settings.totalAmount,
    monthlyLoanRate,
    loanDurationInMonths
  );
  /*  const totalDueAmount = loanDurationInMonths * monthlyLoanCost; */
  /* const totalLoanCost = totalDueAmount - settings.totalAmount; */
  const debtLoanRatio = (monthlyLoanCost / settings.netMonthlyIncome) * 100;
  const amortizationTable = amortizationEvolution(
    settings.totalAmount,
    monthlyLoanCost,
    monthlyLoanRate,
    loanDurationInMonths
  );

  return {
    debtLoanRatio: Number(debtLoanRatio.toFixed(2)),
    monthlyLoanCost: Number(monthlyLoanCost.toFixed(2)),
    amortizationTable: amortizationTable,
  };
};
