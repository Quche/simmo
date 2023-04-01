import { LoanDetails } from '../components/LoanDetailsDisplay';

function parseLoanDetails(loanDetailsResponse: unknown): LoanDetails {
  if (typeof loanDetailsResponse !== 'object' || loanDetailsResponse === null) {
    throw new Error('Invalid loan details');
  }

  if (
    !('debtLoanRatio' in loanDetailsResponse) ||
    typeof loanDetailsResponse.debtLoanRatio !== 'number'
  ) {
    throw new Error('Invalid debtLoanRatio');
  }

  if (
    !('monthlyLoanCost' in loanDetailsResponse) ||
    typeof loanDetailsResponse.monthlyLoanCost !== 'number'
  ) {
    throw new Error('Invalid monthlyLoanCost');
  }

  return {
    debtLoanRatio: loanDetailsResponse.debtLoanRatio,
    monthlyLoanCost: loanDetailsResponse.monthlyLoanCost,
  };
}

export { parseLoanDetails };
