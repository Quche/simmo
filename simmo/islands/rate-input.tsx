import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { z } from "zod";

const rateSchema = z.preprocess(
  (val) => parseFloat(z.string().parse(val)),
  z.number().min(0).max(1).step(0.01),
);
export type Rate = z.infer<typeof rateSchema>;

export interface RateInputProps {
  rate: Rate;
  onChange: (rate: Rate) => void;
  inputTitle: string;
}

const RateInput: FunctionComponent<RateInputProps> = (
  { rate, onChange, inputTitle },
) => {
  const [rateValue, setRateValue] = useState<Rate>(rate)

  const validateRate = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.currentTarget.value;
    const parseRes = rateSchema.safeParse(value);
    if (parseRes.success) {
      setRateValue(parseRes.data)
      onChange(parseRes.data);
      return;
    }

    console.log("Invalid rate", parseRes.error);
    switch (parseRes.error.issues[0].code) {
      case "too_small":
        setRateValue(parseRes.error.issues[0].minimum);
        onChange(parseRes.error.issues[0].minimum);
        return;
      case "too_big":
        setRateValue(parseRes.error.issues[0].maximum);
        onChange(parseRes.error.issues[0].maximum);
        return;
      }
  };

  return (
    <div>
      <label>
        {inputTitle}
        <input
          type="number"
          min="0"
          step={0.01}
          value={rateValue}
          onInput={validateRate}
        />
      </label>
    </div>
  );
};

export default RateInput;
