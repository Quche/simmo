def compute_monthly_loan_rate(Ta):
    periodicLoanRate = (1 + Ta/100) ** (1/12) - 1
    return periodicLoanRate * 100

def compute_monthly_payment(loanAmount, periodicLoanRate, loanDuration):
    monthly_payment = (loanAmount * periodicLoanRate/100 * (1+periodicLoanRate/100)**(loanDuration) ) / ( (1 + periodicLoanRate/100)**(loanDuration) - 1 )
    return monthly_payment

def compute_totalDueAmount_from_monthly_payment(monthlyLoanCost, periodicLoanRate, loanDuration):
    loanAmount = (monthlyLoanCost * ( (1 + periodicLoanRate/100)**(loanDuration) - 1 ) ) / ( periodicLoanRate/100 * (1 + periodicLoanRate/100)**(loanDuration) )
    return loanAmount

def instant_amortization(remainingLoanDue, monthlyLoanCost, periodicLoanRate):
    interest = remainingLoanDue * periodicLoanRate/100
    capitalAmortization = monthlyLoanCost - interest
    remainingLoan = remainingLoanDue - capitalAmortization
    return interest, capitalAmortization, remainingLoan

def amortization_evolution(loanAmount, monthlyLoanCost, periodicLoanRate, loanDuration):
    amortization_evolution = {}
    C = loanAmount
    for i in range(loanDuration):
        interest, capitalAmortization, remainingLoan = instant_amortization(C,monthlyLoanCost,periodicLoanRate)
        temp_amortization_evolution = {
            'month': i + 1,
            'interest': interest,
            'capitalAmortization': capitalAmortization
        }
        amortization_evolution[i + 1] = temp_amortization_evolution
        C = remainingLoan
    return amortization_evolution