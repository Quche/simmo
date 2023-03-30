import React, { useState, ChangeEvent } from 'react';

const parseStringToFloat = (value: string) => {
  const parsedValue = parseFloat(value.replace(/[^0-9.,]/g, ''));
  return isNaN(parsedValue) ? 0 : parsedValue;
};

interface RateInputProps {
  rate: number;
  onChange: (value: number) => void;
  inputTitle: string;
}

const RateInput: React.FC<RateInputProps> = ({ rate, onChange, inputTitle }) => {
  const [inputValue, setInputValue] = useState<string>(String(rate));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.endsWith('.')) {
      setInputValue(e.target.value);
      return;
    }
    const parsedRate = parseStringToFloat(e.target.value);
    setInputValue(String(parsedRate));
    onChange(parsedRate);
  };

  return (
    <div>
      <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
        {inputTitle}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white text-right"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter amount"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-700 sm:text-sm"> %</span>
        </div>
      </div>
    </div>
  );
};

export default RateInput;
