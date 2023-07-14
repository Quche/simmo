import type { PageServerLoad } from './$types';

import { computeLoanResults } from '$lib/loan';
import { toPercentage } from '$lib/types/rate';
import { toYear } from '$lib/types/time';

export const load = (async ({ url }) => {
  const results = computeLoanResults({
    rate: toPercentage(Number(url.searchParams.get('rate'))),
    duration: toYear(Number(url.searchParams.get('duration'))),
    amount: Number(url.searchParams.get('amount')),
    monthlyIncome: Number(url.searchParams.get('income')),
  });

  return {
    params: {
      amount: url.searchParams.get('amount'),
      duration: url.searchParams.get('duration'),
      rate: url.searchParams.get('rate'),
      income: url.searchParams.get('income'),
      initialResults: {
        debtLoanRatio: results.debtRatio,
        monthlyLoanCost: results.monthlyPayment,
        totalLoanCost: results.totalCost,
      },
    },
  };
}) satisfies PageServerLoad;
