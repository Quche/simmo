import React from 'react';
import { exportAmortizationCSV } from './CsvExporter';

export interface LoanDetails {
  debtLoanRatio: number;
  monthlyLoanCost: number;
  amortizationEvolution: any;
}

interface LoanDetailsProps {
  loanDetails: LoanDetails | undefined;
}

const LoanDetailsDisplay: React.FC<LoanDetailsProps> = ({ loanDetails }) => {
  if (!loanDetails) {
    return null;
  }

  const downloadAmortizationTable = async () => {
    return exportAmortizationCSV(loanDetails.amortizationEvolution)
  };
  const isDebtLoanRatioTooHigh = loanDetails.debtLoanRatio > 33;
  const debtRatioStyle = isDebtLoanRatioTooHigh ? 'text-red-500' : 'text-green-500';

  return (
    <div className="flex-auto">
      <ul>
        <li>Montant des mensualités : {loanDetails.monthlyLoanCost.toFixed(2)} €/mois</li>
        <li className={debtRatioStyle}>
          Taux d'endettement : {loanDetails.debtLoanRatio.toFixed(2)} %
        </li>
        <button className="btn btn-blue" onClick={ downloadAmortizationTable }>
            Télécharger le tableau d'amortissement.
        </button>
      </ul>
    </div>
  );
};

export default LoanDetailsDisplay;
