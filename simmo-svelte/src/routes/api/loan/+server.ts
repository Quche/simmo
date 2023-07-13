import { computeProjectResults } from '$lib/project';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();

  const results = computeProjectResults({
    yearlyLoanRate: Number(data.rate),
    loanDuration: Number(data.duration),
    totalAmount: Number(data.amount),
    netMonthlyIncome: Number(data.income),
  });

  return new Response(
    JSON.stringify({
      results: {
        debtLoanRatio: results.debtLoanRatio,
        monthlyLoanCost: results.monthlyLoanCost,
        totalLoanCost: results.amortizationTable.reduce((acc, { interest }) => acc + interest, 0),
      },
    })
  );
};
