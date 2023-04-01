import { useState } from 'react';
import './App.css';
import LoanDetailsDisplay, { LoanDetails } from './components/LoanDetailsDisplay';
import MonetaryInput from './components/MonetaryInput';
import RateInput from './components/RateInput';
import { parseLoanDetails } from './utils/parseLoanDetails';
import ExportLoanDetails, { AmortizationItem } from './components/ExportLoanDetails';
import { parseAmortization } from './utils/parseAmortization';

function App() {
  const [totalInvestment, setTotalInvestment] = useState(300_000);
  const [monthlyRevenues, setMonthlyRevenues] = useState(3_000);
  const [durationInMonths, setDurationInMonths] = useState(300);
  const [annualRate, setAnnualRate] = useState(2.9);
  const [loanResults, setLoanResults] = useState<LoanDetails | undefined>(undefined);
  const [amortizationResults, setamortizationResults] = useState<AmortizationItem[] | undefined>(
    undefined,
  );
  const currencySymbol = '€';

  const onClick = async () => {
    const url = new URL('http://127.0.0.1:8080/project_analysis');

    url.searchParams.append('yearlyLoanRate', annualRate.toString());
    url.searchParams.append('loanDuration', durationInMonths.toString());
    url.searchParams.append('loanAmount', totalInvestment.toString());
    url.searchParams.append('netMonthlyIncome', monthlyRevenues.toString());

    const response = await fetch(url, {
      method: 'POST',
    });
    const data = await response.json();
    setLoanResults(parseLoanDetails(data));
    setamortizationResults(parseAmortization(data));
  };

  return (
    <div className="App">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-2">
        Simmo
      </h2>
      <div className="flex-auto">
        <MonetaryInput
          currencySymbol="€"
          value={monthlyRevenues}
          onChange={setMonthlyRevenues}
          inputTitle="Revenus mensuels"
        />
        <MonetaryInput
          currencySymbol={currencySymbol}
          value={totalInvestment}
          onChange={setTotalInvestment}
          inputTitle="Somme à emprunter"
        />
        <MonetaryInput
          currencySymbol=""
          value={durationInMonths}
          onChange={setDurationInMonths}
          inputTitle="Durée de remboursement (en mois)"
        />
        <RateInput rate={annualRate} onChange={setAnnualRate} inputTitle="Taux annuel" />
      </div>
      <button
        className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={onClick}
      >
        Calculer votre projet
      </button>
      <LoanDetailsDisplay loanDetails={loanResults} />
      <ExportLoanDetails amortizationEvolution={amortizationResults} />
    </div>
  );
}

export default App;
