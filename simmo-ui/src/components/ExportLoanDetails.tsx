import { exportAmortizationCSV } from '../utils/exportAmortizationCSV';

export type AmortizationItem = {
  month: number;
  interest: number;
  capitalAmortization: number;
};

export type ExportLoadDetailsProps = {
  amortizationEvolution: AmortizationItem[] | undefined;
};

const ExportLoadDetails: React.FC<ExportLoadDetailsProps> = ({ amortizationEvolution }) => {
  if (!amortizationEvolution) {
    return null;
  }

  const downloadAmortizationTable = () => {
    return exportAmortizationCSV(amortizationEvolution);
  };

  return (
    <button
      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={downloadAmortizationTable}
    >
      Télécharger le tableau d'amortissement.
    </button>
  );
};

export default ExportLoadDetails;
