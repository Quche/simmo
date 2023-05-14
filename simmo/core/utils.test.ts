import { assertEquals } from "https://deno.land/std@0.109.0/testing/asserts.ts";
import { computeMonthlyLoanRate, computeMonthlyPayment } from "./utils.ts";

Deno.test("test_compute_monthly_loan_rate", () => {
  assertEquals(Number(computeMonthlyLoanRate(1.2).toFixed(4)), 0.0995);
  assertEquals(computeMonthlyLoanRate(0), 0);
});

Deno.test("test_compute_monthly_payment", () => {
  assertEquals(
    Number(computeMonthlyPayment(100000, 0.5, 20 * 12).toFixed(2)),
    716.43,
  );
});

Deno.test("test_compute_monthly_payment_with_zero_loan_amount", () => {
  assertEquals(computeMonthlyPayment(0, 0.5, 20 * 12), 0);
  assertEquals(computeMonthlyPayment(0, 0.5, 40 * 12), 0);
});
