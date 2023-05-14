import { computeMonthlyLoanRate, computeMonthlyPayment } from "./utils.ts";

export interface ProjectSettings {
  yearlyLoanRate: number;
  loanDuration: number;
  totalAmount: number;
  netMonthlyIncome: number;
}

export interface ProjectResults {
  debtLoanRatio: number;
  monthlyLoanCost: number;
}

export const computeProjectResults = (
  settings: ProjectSettings,
): ProjectResults => {
  const loanDurationInMonths = settings.loanDuration * 12;
  console.log(`
        Hypothèses de crédit:
        - Salaire net mensuel: ${settings.netMonthlyIncome}€.
        - Somme totale empreintée: ${settings.totalAmount}€.
        - Taux annuel: ${settings.yearlyLoanRate}%.
        - Nombre de mois: ${loanDurationInMonths}.
        `);

  const monthlyLoanRate = computeMonthlyLoanRate(settings.yearlyLoanRate);
  const monthlyLoanCost = computeMonthlyPayment(
    settings.totalAmount,
    monthlyLoanRate,
    loanDurationInMonths,
  );
  const totalDueAmount = loanDurationInMonths * monthlyLoanCost;
  const totalLoanCost = totalDueAmount - settings.totalAmount;
  const debtLoanRatio = (monthlyLoanCost / settings.netMonthlyIncome) * 100;
  /*   const amortizationTable = amortizationEvolution(
    settings.totalAmount,
    monthlyLoanCost,
    monthlyLoanRate,
    loanDurationInMonths,
  ); */

  console.log(`
        Mensualités et coûts totaux:
        - Mensualité calculée: ${monthlyLoanCost}€.
        - Coût total du crédit: ${totalLoanCost}€.
        - Somme totale à rembourser: ${totalDueAmount}€.
        - Taux d'endettement: ${debtLoanRatio}%.
        `);

  return {
    debtLoanRatio: Number(debtLoanRatio.toFixed(2)),
    monthlyLoanCost: Number(monthlyLoanCost.toFixed(2)),
  };
};
