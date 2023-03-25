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

        # Print generic informations for logs
        print(f'''
            Hypothèses de crédit:
            - Somme totale empreintée: {self.loanAmount}€.
            - Taux annuel: {self.yearlyLoanRate}%.
            - Nombre de mois: {self.loanDuration}.
            ''')

        # Compute monthly loan rate
        self.monthlyLoanRate = compute_monthly_loan_rate(self.yearlyLoanRate)

        # Compute the monthly payment due
        self.monthlyLoadCost = compute_monthly_payment(
            self.loanAmount,
            self.monthlyLoanRate,
            self.loanDuration
        )

        # Total due amount
        self.totalDueAmount = self.loanDuration * self.monthlyLoadCost

        # Total cost of the loan
        self.totalLoanCost = self.totalDueAmount - self.loanAmount

        # Debt load ration
        self.debtLoanRatio = (self.monthlyLoadCost / self.netMonthlyIncome ) * 100

        # Log results
        print(f'''
            Mensualités et coûts totaux:
            - Mensualité calculée: {self.monthlyLoadCost}€.
            - Coût total du crédit: {self.totalLoanCost}€.
            - Somme totale à rembourser: {self.totalDueAmount}€.
            - Taux d'endettement: {self.debtLoanRatio}%.
            ''')

        return {
            "yearlyLoanRate": self.yearlyLoanRate,
            "monthlyLoanCost": self.monthlyLoadCost,
            "loanDuration": self.loanDuration,
            "loanAmount": self.loanAmount,
            "netMonthlyIncome": self.netMonthlyIncome,
            "monthlyLoanRate": self.monthlyLoanRate,
            "totalDueAmount": self.totalDueAmount,
            "totalLoanCost": self.totalLoanCost,
            "debtLoanRatio": self.debtLoanRatio
        }

# yearlyLoanRate = 2.34
# loanDuration = 20*12
# loanAmount = 150000
# netMonthlyIncome = 3400

# project = Project(
#     yearlyLoanRate,
#     loanDuration,
#     loanAmount,
#     netMonthlyIncome
# )

# t = project.run()
# print(t)