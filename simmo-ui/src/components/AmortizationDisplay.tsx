import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts';
import { AmortizationItem } from './ExportLoanDetails';

export type AmortizationDisplayProps = {
  amortizationEvolution: AmortizationItem[] | undefined;
};

const AmortizationDisplay: React.FC<AmortizationDisplayProps> = ({ amortizationEvolution }) => {
  if (!amortizationEvolution) {
    return null;
  }

  const numberOfMonths = amortizationEvolution.length;

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (!active || !payload || !label) {
      return null;
    }

    const capital = payload[0].value || 0;
    const interest = payload[1].value || 0;

    return (
      <div className="custom-tooltip">
        <p className="label">{`Mois ${label}`}</p>
        <p className="label">{`Capital remboursé : ${capital} €`}</p>
        <p className="label">{`Intérêts payés : ${interest} €`}</p>
      </div>
    );
  };

  return (
    <div style={{ width: 700, height: 450 }} className="m-4">
      <ResponsiveContainer>
        <LineChart
          data={amortizationEvolution}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <YAxis>
            <Label textAnchor="middle" value="€" position="insideLeft" angle={-90} />
          </YAxis>
          <XAxis domain={[1, numberOfMonths]} interval="preserveStartEnd">
            <Label value="Mois" position="bottom" textAnchor="middle" offset={0} />
          </XAxis>
          <Line
            type="monotone"
            textAnchor="middle"
            dataKey="capitalAmortization"
            stroke="#8884d8"
            dot={false}
            name="Capital remboursé"
          />
          <Line type="monotone" dataKey="interest" stroke="#82ca9d" dot={false} name="Intérêts" />
          <Tooltip content={<CustomTooltip />} />
          <Legend layout="horizontal" verticalAlign="top" align="center" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AmortizationDisplay;
