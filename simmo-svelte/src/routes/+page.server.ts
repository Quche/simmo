import type { Actions } from './loan/$types';
import { computeProjectResults } from '$lib/project';

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
        results,
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
