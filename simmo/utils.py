def taux_mensuel(Ta):
    Tp = (1 + Ta/100) ** (1/12) - 1
    return round(Tp, 6) * 100
