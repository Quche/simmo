import type { Opaque } from './opaque';

export type Rate = Opaque<'Rate', number>;

export type Percentage = Opaque<'Percentage', number>;

export const toRate = (value: number): Rate => {
  return value as Rate;
};

export const toPercentage = (value: number): Percentage => {
  return value as Percentage;
};

export const percentageFromRate = (rate: Rate): Percentage => {
  return (rate * 100) as Percentage;
};

export const rateFromPercentage = (percentage: Percentage): Rate => {
  return (percentage / 100) as Rate;
};
