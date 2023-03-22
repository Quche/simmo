from simmo.generic.quantities import mensualite
from simmo.utils import calcul_taux_mensuel

class Capacity:
    def __init__(
        self,
        monthlyNetIncome,
        personnalDeposit,
        loanDuration,
        yearlyLoanRate,
        maximalLoanRate,
    ):
        self.monthlyNetIncome = monthlyNetIncome
        self.personnalDeposit = personnalDeposit
        self.loanDuration = loanDuration
        self.yearlyLoanRate = yearlyLoanRate
        self.maximalLoanRate = maximalLoanRate

    def run(self):

        # Print generic informations for logs
        print(f'''
            Hypothèses de simulation de capacité d'emprunt:
            - Salaire net mensuel avant import: {self.monthlyNetIncome}€.
            - Apport personnel: {self.personnalDeposit}€.
            - Taux annuel de prêt (TAEG): {self.yearlyLoanRate}.
            - Durée du crédit: {self.loanDuration} mois.
            - Taux d'endettement maximal: {self.maximalLoanRate}%.
            ''')

        # Mensualités à partir du taux maximal d'endettement
        self.monthlyPaiement = mensualite(self.monthlyNetIncome, self.maximalLoanRate)

        # Cout de la mensualité
        self.monthlyLoanRate = calcul_taux_mensuel(self.yearlyLoanRate)
        self.netMonthlyLoan = (1 - self.monthlyLoanRate) * self.monthlyPaiement


capacity = Capacity(
    3000,
    60000,
    300,
    0.3,
    0.35
)

capacity.run()

test = 1