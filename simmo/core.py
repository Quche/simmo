from simmo.utils import taux_mensuel

def cout_mensualite(C0, Ta, Nr):
    Tp = taux_mensuel(Ta)
    M = (C0 * Tp/100 * (1+Tp/100)**(Nr) ) / ( (1 + Tp/100)**(Nr) - 1 )
    return round(M,2)

# def cout_total_interets(C0, Ta, Nr):
#     M = montant_remboursement(C0, Ta, Nr)
#     I = (M * Nr) - C0
#     return I

# mensualites = montant_remboursement(C0, Ta, Nr)
# total_interet = cout_total_interets(C0, Ta, Nr)

# print(f'''
#     {C0}€ sur {Nr} mois au taux annuel de {Ta}% donne:
#     mensualités de {mensualites}
#     total remboursé: {mensualites*Nr}
#     total intéret: {total_interet}
#     ''')
