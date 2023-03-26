from project.utils import compute_totalDueAmount_from_monthly_payment, compute_monthly_loan_rate, amortization_evolution

class Capacity:

    def __init__(
        self,
        yearlyLoanRate,
        loanDuration,
        maxdebtLoanRatio,
        netMonthlyIncome,
    ):
        self.yearlyLoanRate = yearlyLoanRate
        self.loanDuration = loanDuration
        self.maxdebtLoanRatio = maxdebtLoanRatio
        self.netMonthlyIncome = netMonthlyIncome

    def run(self):

        resp = {}
        resp['yearlyLoanRate'] = self.yearlyLoanRate
        resp['loanDuration'] = self.loanDuration
        resp['maxdebtLoanRatio'] = self.maxdebtLoanRatio
        resp['netMonthlyIncome'] = self.netMonthlyIncome

        # Print generic informations for logs
        print(f'''
            Hypothèses de crédit:
            - Salaire net mensuel: {self.netMonthlyIncome}€.
            - Taux d'endettement: {self.maxdebtLoanRatio}€.
            - Taux annuel: {self.yearlyLoanRate}%.
            - Nombre de mois: {self.loanDuration}.
            ''')

        # Compute the related monthlyLoanCost
        self.monthlyLoanCost = (self.maxdebtLoanRatio * self.netMonthlyIncome ) * 1/100
        resp['monthlyLoanCost'] = self.monthlyLoanCost

        # Compute the loanAmount
        self.monthlyLoanRate = compute_monthly_loan_rate(self.yearlyLoanRate)
        self.loanAmount = compute_totalDueAmount_from_monthly_payment(
            self.monthlyLoanCost,
            self.monthlyLoanRate,
            self.loanDuration
        )
        resp['loanAmount'] = self.loanAmount

        # Compute the totalLoanCost
        self.totalDueAmount = self.loanDuration * self.monthlyLoanCost
        resp['totalDueAmount'] = self.totalDueAmount
        self.totalLoanCost = self.totalDueAmount - self.loanAmount
        resp['totalLoanCost'] = self.totalLoanCost

        # Amortization table
        self.amortizationEvolution = amortization_evolution(
            self.loanAmount,
            self.monthlyLoanCost,
            self.monthlyLoanRate,
            self.loanDuration)
        resp['amortizationEvolution'] = self.amortizationEvolution

        return resp

yearlyLoanRate = 4
loanDuration = 300
maxdebtLoanRatio = 33
netMonthlyIncome = 3400

my_capa = Capacity(yearlyLoanRate, loanDuration, maxdebtLoanRatio, netMonthlyIncome)
my_capa.run()
