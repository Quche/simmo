import { ExportToCsv } from 'export-to-csv';
import { AmortizationItem } from '../components/ExportLoanDetails';

const exportAmortizationCSV = (amortizationEvolution: AmortizationItem[]) => {
  const options = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    filename: 'tableau_amortissement',
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);

  csvExporter.generateCsv(amortizationEvolution);
};

export { exportAmortizationCSV };
