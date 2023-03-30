import React from 'react';

export interface LoanDetails {
  debtLoanRatio: number;
  monthlyLoanCost: number;
}

interface LoanDetailsProps {
  loanDetails: LoanDetails | undefined;
}

const LoanDetailsDisplay: React.FC<LoanDetailsProps> = ({ loanDetails }) => {
  if (!loanDetails) {
    return null;
  }

  const isDebtLoanRatioTooHigh = loanDetails.debtLoanRatio > 33;
  const debtRatioStyle = isDebtLoanRatioTooHigh ? 'text-red-500' : 'text-green-500';

  return (
    <div className="flex-auto">
      <ul>
        <li>Montant des mensualités : {loanDetails.monthlyLoanCost.toFixed(2)} €/mois</li>
        <li className={debtRatioStyle}>
          Taux d'endettement : {loanDetails.debtLoanRatio.toFixed(2)} %
        </li>
      </ul>
    </div>
  );
};

export default LoanDetailsDisplay;
