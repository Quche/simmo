import type { Opaque } from './opaque';

export type Month = Opaque<'Month', number>;

export const toMonth = (value: number): Month => {
  return value as Month;
};

export type Year = Opaque<'Year', number>;

export const toYear = (value: number): Year => {
  return value as Year;
};

export const yearToMonth = (year: Year): Month => {
  return (year * 12) as Month;
};

export const monthToYear = (month: Month): Year => {
  return (month / 12) as Year;
};
