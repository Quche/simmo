from simmo.utils import taux_mensuel

def cout_mensualite(C0, Ta, Nr):
    Tp = taux_mensuel(Ta)
    M = (C0 * Tp/100 * (1+Tp/100)**(Nr) ) / ( (1 + Tp/100)**(Nr) - 1 )
    return M

def cout_total_interets(C0, Ta, Nr):
    M = cout_mensualite(C0, Ta, Nr)
    I = (M * Nr) - C0
    return I

def amortissement(C, M, Tp):
    interet = C * Tp/100
    cap_amorti = M - interet
    reste_du = C - cap_amorti
    return interet, cap_amorti, reste_du

def tableau_amortissement(C0, M, Tp, Nr):
    tab_amortissemennt = []
    C = C0
    for i in range(Nr):
        interet, cap_amorti, reste_du = amortissement(C,M,Tp)
        tab_amortissemennt.append([i + 1, M, interet, cap_amorti, reste_du])
        C = reste_du
    return tab_amortissemennt