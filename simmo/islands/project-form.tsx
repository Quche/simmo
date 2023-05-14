import { useState } from "preact/hooks";
import RateInput from "./rate-input.tsx";

export default function RateForm() {
  const [rate, setRate] = useState(0.5);

  const onChange = (rate: number) => {
    console.log('New rate: ', rate)
    setRate(rate);
  };

  return (
    <div>
      <RateInput rate={rate} onChange={onChange} inputTitle="Mon titre" />
    </div>
  );
}
