def compute_monthly_loan_rate(Ta):
    periodicLoanRate = (1 + Ta/100) ** (1/12) - 1
    return periodicLoanRate * 100
