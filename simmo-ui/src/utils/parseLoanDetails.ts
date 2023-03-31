import { LoanDetails } from '../components/LoanDetailsDisplay';

function parseLoanDetails(loanDetails: unknown): LoanDetails {
  if (typeof loanDetails !== 'object' || loanDetails === null) {
    throw new Error('Invalid loan details');
  }

  if (!('debtLoanRatio' in loanDetails) || typeof loanDetails.debtLoanRatio !== 'number') {
    throw new Error('Invalid debtLoanRatio');
  }

  if (!('monthlyLoanCost' in loanDetails) || typeof loanDetails.monthlyLoanCost !== 'number') {
    throw new Error('Invalid monthlyLoanCost');
  }

  return {
    debtLoanRatio: loanDetails.debtLoanRatio,
    monthlyLoanCost: loanDetails.monthlyLoanCost,
    amortizationEvolution: loanDetails.amortizationEvolution
  };
}

export { parseLoanDetails };
