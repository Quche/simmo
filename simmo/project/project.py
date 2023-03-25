# define project class
from simmo.project.utils import compute_monthly_loan_rate, compute_monthly_payment

class Project:

    def __init__(
        self,
        yearlyLoanRate,
        loanDuration,
        loanAmount,
        netMonthlyIncome
    ):
        self.yearlyLoanRate = yearlyLoanRate
        self.loanDuration = loanDuration
        self.loanAmount = loanAmount
        self.netMonthlyIncome = netMonthlyIncome

    def run(self):

        resp = {}
        resp['yearlyLoanRate'] = self.yearlyLoanRate
        resp['loanDuration'] = self.loanDuration
        resp['loanAmount'] = self.loanAmount
        resp['netMonthlyIncome'] = self.netMonthlyIncome

        # Print generic informations for logs
        print(f'''
            Hypothèses de crédit:
            - Somme totale empreintée: {self.loanAmount}€.
            - Taux annuel: {self.yearlyLoanRate}%.
            - Nombre de mois: {self.loanDuration}.
            ''')

        # Compute monthly loan rate
        self.monthlyLoanRate = compute_monthly_loan_rate(self.yearlyLoanRate)
        resp['monthlyLoanRate'] = self.monthlyLoanRate

        # Compute the monthly payment due
        self.monthlyLoadCost = compute_monthly_payment(
            self.loanAmount,
            self.monthlyLoanRate,
            self.loanDuration
        )
        resp['loanAmount'] = self.loanAmount
        resp['monthlyLoanRate'] = self.monthlyLoanRate
        resp['loanDuration'] = self.loanDuration

        # Total due amount
        self.totalDueAmount = self.loanDuration * self.monthlyLoadCost
        resp['totalDueAmount'] = self.totalDueAmount

        # Total cost of the loan
        self.totalLoanCost = self.totalDueAmount - self.loanAmount
        resp['totalLoanCost'] = self.totalLoanCost

        # Debt load ration
        self.debtLoanRatio = (self.monthlyLoadCost / self.netMonthlyIncome ) * 100
        resp['debtLoanRatio'] = self.debtLoanRatio

        # Log results
        print(f'''
            Mensualités et coûts totaux:
            - Mensualité calculée: {self.monthlyLoadCost}€.
            - Coût total du crédit: {self.totalLoanCost}€.
            - Somme totale à rembourser: {self.totalDueAmount}€.
            - Taux d'endettement: {self.debtLoanRatio}%.
            ''')

        return resp
