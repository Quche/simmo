from simmo.utils import compute_monthly_loan_rate

def compute_periodic_loan_cost(loanAmount, periodicLoanRate, loanDuration):
    M = (loanAmount * periodicLoanRate/100 * (1+periodicLoanRate/100)**(loanDuration) ) / ( (1 + periodicLoanRate/100)**(loanDuration) - 1 )
    return M

def cout_total_interets(loanAmount, Ta, Nr):
    M = cout_mensualite(loanAmount, Ta, Nr)
    I = (M * Nr) - loanAmount
    return I

def amortissement(C, M, periodicLoanRate):
    interet = C * periodicLoanRate/100
    cap_amorti = M - interet
    reste_du = C - cap_amorti
    return interet, cap_amorti, reste_du

def tableau_amortissement(loanAmount, M, periodicLoanRate, Nr):
    tab_amortissemennt = []
    C = loanAmount
    for i in range(Nr):
        interet, cap_amorti, reste_du = amortissement(C,M,periodicLoanRate)
        tab_amortissemennt.append([i + 1, M, interet, cap_amorti, reste_du])
        C = reste_du
    return tab_amortissemennt