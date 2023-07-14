import type { Actions } from '@sveltejs/kit';
import { computeLoanResults } from '$lib/loan';
import { toPercentage } from '$lib/types/rate';
import { toYear } from '$lib/types/time';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const results = computeLoanResults({
      rate: toPercentage(Number(data.get('rate'))),
      duration: toYear(Number(data.get('duration'))),
      amount: Number(data.get('amount')),
      monthlyIncome: Number(data.get('income')),
    });

    return {
      status: 200,
      body: {
        results: {
          debtLoanRatio: results.debtRatio,
          monthlyLoanCost: results.monthlyPayment,
          totalLoanCost: results.totalCost,
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
