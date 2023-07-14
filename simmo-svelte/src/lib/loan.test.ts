import { computeLoanResults } from './loan';
import { toPercentage } from './types/rate';
import { toYear } from './types/time';

describe('Computing the results of a loan request', () => {
  it('should process a request for a 100k€ loan, at 5% annual rate, over 10 years', () => {
    const loanRequest = {
      amount: 100_000,
      rate: toPercentage(5),
      duration: toYear(10),
      monthlyIncome: 2_000,
    };

    const { monthlyPayment, totalCost, debtRatio } = computeLoanResults(loanRequest);

    expect(monthlyPayment).toBeCloseTo(1_060.66);
    expect(totalCost).toBeCloseTo(27_278, -1);
    expect(debtRatio).toBeCloseTo(53.03);
  });

  it('should process a request for a 250k€ loan, at 2% annual rate, over 25 years', () => {
    const loanRequest = {
      amount: 250_000,
      rate: toPercentage(2),
      duration: toYear(25),
      monthlyIncome: 2_000,
    };

    const { monthlyPayment, totalCost, debtRatio } = computeLoanResults(loanRequest);

    expect(monthlyPayment).toBeCloseTo(1059.64);
    expect(totalCost).toBeCloseTo(67_890, -1);
    expect(debtRatio).toBeCloseTo(52.98);
  });

  it('should process a request for a 15k€ loan, at 7.5% annual rate, over 1 year', () => {
    const loanRequest = {
      amount: 15_000,
      rate: toPercentage(7.5),
      duration: toYear(1),
      monthlyIncome: 2_000,
    };

    const { monthlyPayment, totalCost, debtRatio } = computeLoanResults(loanRequest);

    expect(monthlyPayment).toBeCloseTo(1_301.36);
    expect(totalCost).toBeCloseTo(616, -1);
    expect(debtRatio).toBeCloseTo(65.07);
  });
});
