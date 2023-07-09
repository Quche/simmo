import { computeProjectResults } from '$lib/project';

export function load({ url }) {
  const results = computeProjectResults({
    yearlyLoanRate: Number(url.searchParams.get('rate')),
    loanDuration: Number(url.searchParams.get('duration')),
    totalAmount: Number(url.searchParams.get('amount')),
    netMonthlyIncome: Number(url.searchParams.get('income')),
  });

  return {
    params: {
      amount: url.searchParams.get('amount'),
      duration: url.searchParams.get('duration'),
      rate: url.searchParams.get('rate'),
      income: url.searchParams.get('income'),
      initialResults: {
        debtLoanRatio: results.debtLoanRatio,
        monthlyLoanCost: results.monthlyLoanCost,
        totalLoanCost: results.amortizationTable.reduce((acc, { interest }) => acc + interest, 0),
      },
    },
  };
}
