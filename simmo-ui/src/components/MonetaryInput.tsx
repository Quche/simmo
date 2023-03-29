import React, { useState, ChangeEvent } from 'react';

const parseStringToInteger = (value: string) => {
  const parsedValue = parseInt(value.replace(/[^0-9.,]/g, ''), 10);
  return isNaN(parsedValue) ? 0 : parsedValue;
};

function formatNumberWithSpaces(number: number): string {
  return number.toLocaleString('fr-FR', {
    useGrouping: true,
  });
}

interface MonetaryInputProps {
  value: number;
  onChange: (value: number) => void;
  currencySymbol: string;
  inputTitle: string;
}

const MonetaryInput: React.FC<MonetaryInputProps> = ({
  value,
  onChange,
  inputTitle,
  currencySymbol = '€',
}) => {
  const [inputValue, setInputValue] = useState<string>(String(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseStringToInteger(e.target.value);
    setInputValue(formatNumberWithSpaces(parsedValue));
    onChange(parsedValue);
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
          <span className="text-gray-700 sm:text-sm"> {currencySymbol}</span>
        </div>
      </div>
    </div>
  );
};

export default MonetaryInput;
