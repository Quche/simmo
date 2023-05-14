export const computeMonthlyLoanRate = (Ta: number): number => {
  const periodicLoanRate = Math.pow(1 + Ta / 100, 1 / 12) - 1;
  return periodicLoanRate * 100;
};

export const computeMonthlyPayment = (
  loanAmount: number,
  periodicLoanRate: number,
  loanDuration: number,
): number => {
  const monthlyPayment = (loanAmount * periodicLoanRate / 100 *
    Math.pow(1 + periodicLoanRate / 100, loanDuration)) /
    (Math.pow(1 + periodicLoanRate / 100, loanDuration) - 1);
  return monthlyPayment;
};

export const computeTotalDueAmountFromMonthlyPayment = (
  monthlyLoanCost: number,
  periodicLoanRate: number,
  loanDuration: number,
): number => {
  return (monthlyLoanCost *
    (Math.pow(1 + periodicLoanRate / 100, loanDuration) - 1)) /
    (periodicLoanRate / 100 *
      Math.pow(1 + periodicLoanRate / 100, loanDuration));
};

export const instantAmortization = (
  remainingLoanDue: number,
  monthlyLoanCost: number,
  periodicLoanRate: number,
): [number, number, number] => {
  const interest = remainingLoanDue * periodicLoanRate / 100;
  const capitalAmortization = monthlyLoanCost - interest;
  const remainingLoan = remainingLoanDue - capitalAmortization;
  return [interest, capitalAmortization, remainingLoan];
};

interface AmortizationItem {
  month: number;
  interest: number;
  capitalAmortization: number;
}

export const amortizationEvolution = (
  loanAmount: number,
  monthlyLoanCost: number,
  periodicLoanRate: number,
  loanDuration: number,
): AmortizationItem[] => {
  const amortizationEvolution: AmortizationItem[] = [];
  let C: number = loanAmount;
  for (let i = 0; i < loanDuration; i++) {
    const [interest, capitalAmortization, remainingLoan] = instantAmortization(
      C,
      monthlyLoanCost,
      periodicLoanRate,
    );
    const item: AmortizationItem = {
      month: i + 1,
      interest: interest,
      capitalAmortization: capitalAmortization,
    };
    amortizationEvolution.push(item);
    C = remainingLoan;
  }
  return amortizationEvolution;
};
