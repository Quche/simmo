// MonetaryInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';

import RateInput from './RateInput';

describe('RateInput', () => {
  test('renders the input field with correct initial rate', () => {
    const initialRate = 0.25;
    render(<RateInput rate={initialRate} onChange={() => {}} inputTitle="toto" />);
    expect(screen.getByDisplayValue('0.25')).toBeInTheDocument();
  });

  test('updates input value when valid rate is entered', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RateInput rate={0} onChange={handleChange} inputTitle="toto" />);
    const input = screen.getByPlaceholderText('Enter amount');

    await user.type(input, '0.25');

    expect(screen.getByDisplayValue('0.25')).toBeInTheDocument();
  });

  test('dont consider non alphanumeric values', async () => {
    const handleChange = vi.fn();
    render(<RateInput rate={0} onChange={handleChange} inputTitle="toto" />);
    const input = screen.getByPlaceholderText('Enter amount');

    await fireEvent.input(input, { target: { value: '25FRE.5FR6' } });

    expect(screen.getByDisplayValue('25.56')).toBeInTheDocument();
  });

  test('calls onChange with parsed rate value when valid input is entered', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RateInput rate={0} onChange={handleChange} inputTitle="toto" />);
    const input = screen.getByPlaceholderText('Enter amount');

    await user.type(input, '123.56');

    expect(handleChange).toHaveBeenCalledWith(123.56);
  });

  test('calls onChange with 0 when input is cleared', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RateInput rate={100} onChange={handleChange} inputTitle="toto" />);
    const input = screen.getByDisplayValue('100');

    await user.clear(input);

    expect(handleChange).toHaveBeenCalledWith(0);
  });
});
