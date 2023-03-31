import { ExportToCsv } from 'export-to-csv';

const exportAmortizationCSV = (amortizationEvolution: JSON) => {

    const options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: false,
        title: 'tableauAmortissement',
        fileName: 'tableauAmortissement.csv',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(amortizationEvolution);
    };

export { exportAmortizationCSV };
