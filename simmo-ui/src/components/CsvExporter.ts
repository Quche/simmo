import { ExportToCsv } from 'export-to-csv';

const exportAmortizationCSV = (amortizationEvolution: JSON) => {

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
