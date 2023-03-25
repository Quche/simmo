# main.py

from simmo.core import cout_mensualite, cout_total_interets, tableau_amortissement
from simmo.utils import compute_monthly_payment
import sys

def main(loanAmount, Ta, Nr):

    print(f'''
        Hypothèses de crédit:
        - Somme totale empreintée: {loanAmount}€.
        - Taux annuel: {Ta}%.
        - Nombre de mois: {Nr}.
        ''')

    # Informations générales:
    I = cout_total_interets(loanAmount, Ta, Nr)
    print(f'''
        Mensualités et coûts totaux:
        - Mensualité calculée: {M}€.
        - Coût total du crédit: {I}€.
        - Somme totale à rembourser: {I}€.
        ''')

    # Tableau d'amortissement
    periodicLoanRate = taux_mensuel(Ta)
    tab_amort = tableau_amortissement(loanAmount, M, periodicLoanRate, Nr)

if __name__ == "__main__":
    loanAmount = int(sys.argv[1])
    Ta = int(sys.argv[2])
    Nr = int(sys.argv[3])
    main(loanAmount, Ta, Nr)


# loanAmount = 200000
# Ta = 3
# Nr = 300
# main(loanAmount, Ta, Nr)