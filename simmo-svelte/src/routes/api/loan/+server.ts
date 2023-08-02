import { computeLoanResults } from '$lib/loan';
import { toPercentage } from '$lib/types/rate';
import { toYear } from '$lib/types/time';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();

  const results = computeLoanResults({
    rate: toPercentage(Number(data.rate)),
    duration: toYear(Number(data.duration)),
    amount: Number(data.amount),
    monthlyIncome: Number(data.income),
  });

  return new Response(
    JSON.stringify({
      results: {
        debtLoanRatio: results.debtRatio,
        monthlyLoanCost: results.monthlyPayment,
        totalLoanCost: results.totalCost,
      },
    })
  );
};
