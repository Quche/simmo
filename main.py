# main.py

from simmo.core import cout_mensualite, cout_total_interets, tableau_amortissement
from simmo.utils import taux_mensuel
import sys

def main(C0, Ta, Nr):

    print(f'''
        Hypothèses de crédit:
        - Somme totale empreintée: {C0}€.
        - Taux annuel: {Ta}%.
        - Nombre de mois: {Nr}.
        ''')

    # Informations générales:
    M = cout_mensualite(C0, Ta, Nr)
    I = cout_total_interets(C0, Ta, Nr)
    print(f'''
        Mensualités et coûts totaux:
        - Mensualité calculée: {M}€.
        - Coût total du crédit: {I}€.
        - Somme totale à rembourser: {I}€.
        ''')

    # Tableau d'amortissement
    Tp = taux_mensuel(Ta)
    tab_amort = tableau_amortissement(C0, M, Tp, Nr)

if __name__ == "__main__":
    C0 = int(sys.argv[1])
    Ta = int(sys.argv[2])
    Nr = int(sys.argv[3])
    main(C0, Ta, Nr)


# C0 = 200000
# Ta = 3
# Nr = 300
# main(C0, Ta, Nr)