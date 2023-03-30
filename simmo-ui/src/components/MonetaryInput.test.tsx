// MonetaryInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';

import MonetaryInput from './MonetaryInput';

describe('MonetaryInput', () => {
  test('renders the input field with correct initial value', () => {
    const initialValue = 100;
    render(
      <MonetaryInput
        value={initialValue}
        onChange={() => {}}
        currencySymbol="€"
        inputTitle="toto"
      />,
    );
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });

  test('updates input value when valid integer is entered', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <MonetaryInput value={0} onChange={handleChange} currencySymbol="€" inputTitle="toto" />,
    );
    const input = screen.getByPlaceholderText('Enter amount');

    await user.type(input, '25');

    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });

  test('dont consider decimal part', async () => {
    const handleChange = vi.fn();
    render(
      <MonetaryInput value={0} onChange={handleChange} currencySymbol="€" inputTitle="toto" />,
    );
    const input = screen.getByPlaceholderText('Enter amount');

    await fireEvent.input(input, { target: { value: '25.56' } });

    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });

  test('dont consider non alphanumeric values', async () => {
    const handleChange = vi.fn();
    render(
      <MonetaryInput value={0} onChange={handleChange} currencySymbol="€" inputTitle="toto" />,
    );
    const input = screen.getByPlaceholderText('Enter amount');

    await fireEvent.input(input, { target: { value: '25FRE.5FR6' } });

    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });

  test('display number with spaces as thousand separator when valid integer is entered', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <MonetaryInput value={0} onChange={handleChange} currencySymbol="€" inputTitle="toto" />,
    );
    const input = screen.getByPlaceholderText('Enter amount');

    await user.type(input, '123456');

    expect(screen.getByDisplayValue('123 456')).toBeInTheDocument();
  });

  test('dont call onChange with spaces as thousand separator', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <MonetaryInput value={0} onChange={handleChange} currencySymbol="€" inputTitle="toto" />,
    );
    const input = screen.getByPlaceholderText('Enter amount');

    await user.type(input, '123456');

    expect(handleChange).toHaveBeenCalledWith(123456);
  });

  test('calls onChange with parsed integer value when valid input is entered', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <MonetaryInput value={0} onChange={handleChange} currencySymbol="€" inputTitle="toto" />,
    );
    const input = screen.getByPlaceholderText('Enter amount');

    await user.type(input, '123');

    expect(handleChange).toHaveBeenCalledWith(123);
  });

  test('calls onChange with 0 when input is cleared', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <MonetaryInput value={100} onChange={handleChange} currencySymbol="€" inputTitle="toto" />,
    );
    const input = screen.getByDisplayValue('100');

    await user.clear(input);

    expect(handleChange).toHaveBeenCalledWith(0);
  });
});
