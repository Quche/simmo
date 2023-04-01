import { parseLoanDetails } from './parseLoanDetails';

describe('parseLoanDetails', () => {
  it('should return a LoanDetails', () => {
    const loanDetailsResponse = {
      debtLoanRatio: 0.5,
      monthlyLoanCost: 0.5,
    };

    const expectedLoanDetails = {
      debtLoanRatio: 0.5,
      monthlyLoanCost: 0.5,
    };
    expect(parseLoanDetails(loanDetailsResponse)).toEqual(expectedLoanDetails);
  });

  it('should throw an error if loanDetailsResponse is not an object', () => {
    const loanDetailsResponse = 1;

    expect(() => parseLoanDetails(loanDetailsResponse)).toThrowError('Invalid loan details');
  });

  it('should throw an error if debtLoanRatio is not a number', () => {
    const loanDetailsResponse = {
      debtLoanRatio: '0.5',
      monthlyLoanCost: 0.5,
    };

    expect(() => parseLoanDetails(loanDetailsResponse)).toThrowError('Invalid debtLoanRatio');
  });

  it('should throw an error if monthlyLoanCost is not a number', () => {
    const loanDetailsResponse = {
      debtLoanRatio: 0.5,
      monthlyLoanCost: '0.5',
    };

    expect(() => parseLoanDetails(loanDetailsResponse)).toThrowError('Invalid monthlyLoanCost');
  });
});
