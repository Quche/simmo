def taux_endettement(salaireNet, mensualite):
    Te = (mensualite/salaireNet)
    return Te

def mensualite(salaireNet, Te):
    return salaireNet * Te