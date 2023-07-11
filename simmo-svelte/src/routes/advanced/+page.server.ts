import type { PageServerLoad, Actions } from './$types';

import { computeProjectResults } from '$lib/project';

export const load = (async ({ url }) => {
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
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const results = computeProjectResults({
      yearlyLoanRate: Number(data.get('rate')),
      loanDuration: Number(data.get('duration')),
      totalAmount: Number(data.get('amount')),
      netMonthlyIncome: Number(data.get('income')),
    });

    return {
      status: 200,
      body: {
        results: {
          debtLoanRatio: results.debtLoanRatio,
          monthlyLoanCost: results.monthlyLoanCost,
          totalLoanCost: results.amortizationTable.reduce((acc, { interest }) => acc + interest, 0),
        },
        settings: {
          rate: Number(data.get('rate')),
          duration: Number(data.get('duration')),
          amount: Number(data.get('amount')),
          income: Number(data.get('income')),
        },
      },
    };
  },
} satisfies Actions;
