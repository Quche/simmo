import { parseAmortization } from './parseAmortization';

describe('parseAmortization', () => {
  it('should return an array of AmortizationItem', () => {
    const loanDetailsResponse = {
      amortizationEvolution: [
        {
          month: 1,
          interest: 0.5,
          capitalAmortization: 0.5,
        },
        {
          month: 2,
          interest: 0.5,
          capitalAmortization: 0.5,
        },
      ],
    };

    const expectedAmortizationEvolution = [
      {
        month: 1,
        interest: 0.5,
        capitalAmortization: 0.5,
      },
      {
        month: 2,
        interest: 0.5,
        capitalAmortization: 0.5,
      },
    ];
    expect(parseAmortization(loanDetailsResponse)).toEqual(expectedAmortizationEvolution);
  });

  it('should throw an error if amortizationEvolution is not an array', () => {
    const loanDetailsResponse = {
      amortizationEvolution: 1,
    };

    expect(() => parseAmortization(loanDetailsResponse)).toThrowError(
      'Invalid amortizationEvolution',
    );
  });

  it('should throw an error if amortizationEvolution is not an array of object', () => {
    const loanDetailsResponse = {
      amortizationEvolution: [1],
    };

    expect(() => parseAmortization(loanDetailsResponse)).toThrowError('Invalid item');
  });

  it('should throw an error if month is not a number', () => {
    const loanDetailsResponse = {
      amortizationEvolution: [
        {
          month: '1',
          interest: 0.5,
          capitalAmortization: 0.5,
        },
      ],
    };

    expect(() => parseAmortization(loanDetailsResponse)).toThrowError('Invalid month');
  });

  it('should throw an error if interest is not a number', () => {
    const loanDetailsResponse = {
      amortizationEvolution: [
        {
          month: 1,
          interest: '0.5',
          capitalAmortization: 0.5,
        },
      ],
    };

    expect(() => parseAmortization(loanDetailsResponse)).toThrowError('Invalid interest');
  });

  it('should throw an error if capitalAmortization is not a number', () => {
    const loanDetailsResponse = {
      amortizationEvolution: [
        {
          month: 1,
          interest: 0.5,
          capitalAmortization: '0.5',
        },
      ],
    };

    expect(() => parseAmortization(loanDetailsResponse)).toThrowError(
      'Invalid capitalAmortization',
    );
  });

  it('should round interest and capitalAmortization to 2 decimals', () => {
    const loanDetailsResponse = {
      amortizationEvolution: [
        {
          month: 1,
          interest: 0.5555555,
          capitalAmortization: 0.5555555,
        },
      ],
    };

    const expectedAmortizationEvolution = [
      {
        month: 1,
        interest: 0.56,
        capitalAmortization: 0.56,
      },
    ];
    expect(parseAmortization(loanDetailsResponse)).toEqual(expectedAmortizationEvolution);
  });
});
