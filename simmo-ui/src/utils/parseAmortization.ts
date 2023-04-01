import { AmortizationItem } from '../components/ExportLoanDetails';

const parseAmortization = (loanDetailsResponse: unknown): AmortizationItem[] => {
  if (typeof loanDetailsResponse !== 'object' || loanDetailsResponse === null) {
    throw new Error('Invalid loan details');
  }

  if (
    !('amortizationEvolution' in loanDetailsResponse) ||
    !Array.isArray(loanDetailsResponse.amortizationEvolution)
  ) {
    throw new Error('Invalid amortizationEvolution');
  }

  return loanDetailsResponse.amortizationEvolution.map((item: unknown) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error('Invalid item');
    }

    if (!('month' in item) || typeof item.month !== 'number') {
      throw new Error('Invalid month');
    }

    if (!('interest' in item) || typeof item.interest !== 'number') {
      throw new Error('Invalid interest');
    }

    if (!('capitalAmortization' in item) || typeof item.capitalAmortization !== 'number') {
      throw new Error('Invalid capitalAmortization');
    }

    return {
      month: item.month,
      interest: roundNumberToPrecision(item.interest),
      capitalAmortization: roundNumberToPrecision(item.capitalAmortization),
    };
  });
};

const roundNumberToPrecision = (value: number, precision: number = 2): number => {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
};

export { parseAmortization };
