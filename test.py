prix = 250000
notaire = 20000
apport = 50000

C0 = prix + notaire - apport
Ta = 3
Nr = 300

def taux_periodique(Ta):
    taux_periodique = (1 + Ta/100) ** (1/12) - 1
    return round(taux_periodique,6)

def montant_remboursement(C0, Ta, Nr):
    Tp = taux_periodique(Ta)
    M = (C0 * Tp * (1+Tp)**(Nr) ) / ( (1 + Tp)**(Nr) - 1 )
    return M

def cout_total_interets(C0, Ta, Nr):
    M = montant_remboursement(C0, Ta, Nr)
    I = (M * Nr) - C0
    return I

mensualites = montant_remboursement(C0, Ta, Nr)
total_interet = cout_total_interets(C0, Ta, Nr)

print(f'''
    {C0}€ sur {Nr} mois au taux annuel de {Ta}% donne:
    mensualités de {mensualites}
    total remboursé: {mensualites*Nr}
    total intéret: {total_interet}
    ''')

