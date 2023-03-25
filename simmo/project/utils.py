def compute_monthly_loan_rate(Ta):
    periodicLoanRate = (1 + Ta/100) ** (1/12) - 1
    return periodicLoanRate * 100

def compute_monthly_payment(loanAmount, periodicLoanRate, loanDuration):
    monthly_payment = (loanAmount * periodicLoanRate/100 * (1+periodicLoanRate/100)**(loanDuration) ) / ( (1 + periodicLoanRate/100)**(loanDuration) - 1 )
    return monthly_payment